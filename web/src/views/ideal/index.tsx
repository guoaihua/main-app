
import React, { useEffect, useState } from 'react';
import './index.scss';
import { marked } from 'marked'
import 'antd/dist/reset.css';
import Drawer from '@components/customer-drawer'
import  * as Api from '../../api/index'
import MakeLabels from '@components/make-labels';
import { Form, Input, message, Button } from 'antd'
import HomeSvg from '@imgs/home.svg'
import {
  Link,
   Outlet,
   useLocation
} from "react-router-dom";

type formProps = {
  inputText: string
  title: string
  label: string
  parsedData: {
    __html: string
  }
}

const Editor = ()=>{
    const [form] = Form.useForm()
    const [labels, setLabels] = useState([]);
    const [parsedData, setParsedData] = useState({
      __html: ''
    })
    const [isUpdate, setIsUpDate] = useState()

  
  const onSubmit = async ()=>{
    form.validateFields().then(async(values)=>{
      if(!parsedData || labels.length < 1 ){
        throw new Error('效验失败')
      }
      let res
      console.log(isUpdate);
      
        if(isUpdate){
          res = await Api?.updateBlog({
            id: isUpdate,
            title: values?.title,
            content: values?.inputText,
            parseContent: parsedData.__html,
            labels: labels.join(';'),
            updateTime: Date.now()
          })
        }else {
          res = await Api?.AddNewBlog({
            title: values?.title,
            content: values?.inputText,
            parseContent: parsedData.__html,
            labels: labels.join(';'),
            updateTime: Date.now()
          })
        }
        if(res){
          message.success('保存成功')
          form.resetFields()
          setLabels([])
          setParsedData({
            __html: ''
          })
        }
    }).catch(err=>{
      console.log(err)
      message.error('请填写完表单内容！')
    })
  }

  const setForm = (data, isUpdate)=>{
    console.log(data)
    // 设置表单
    form.setFieldsValue({
      inputText: data?.content,
      title: data?.title
    });
    // 设置基本数据
    setLabels(data?.labels?.split(';'))
    setParsedData({
      __html: data?.parseContent
    })
    isUpdate && setIsUpDate(data.id)
  }

  useEffect(()=>{
    const inputTextEle = document.querySelector('.inputText')
    const renderContainerEle = document.querySelector('.render-container')

    const renderContainerScrollHandler = (e)=>{
      const ratio = (e.target as HTMLElement)?.scrollTop / (renderContainerEle.scrollHeight - renderContainerEle.clientHeight)
      inputTextEle.scrollTo({
        left: 0,
        top: (inputTextEle.scrollHeight - inputTextEle.clientHeight) * ratio ,
      })
    }

    const inputTextScrollHandler = (e)=>{
      const ratio = (e.target as HTMLElement)?.scrollTop / (inputTextEle.scrollHeight - inputTextEle.clientHeight)
      renderContainerEle.scrollTo({
        left: 0,
        top: (renderContainerEle.scrollHeight - renderContainerEle.clientHeight) * ratio ,
      })
    }

    inputTextEle.addEventListener('mouseenter', ()=>{
      renderContainerEle.removeEventListener('scroll', renderContainerScrollHandler)
    })
    inputTextEle.addEventListener('mouseleave', ()=>{
      renderContainerEle.addEventListener('scroll', renderContainerScrollHandler)
    })
    inputTextEle.addEventListener('scroll',inputTextScrollHandler)

    

    renderContainerEle.addEventListener('mouseenter', ()=>{
      inputTextEle.removeEventListener('scroll', inputTextScrollHandler)
    })
    renderContainerEle.addEventListener('mouseleave', ()=>{
      inputTextEle.addEventListener('scroll', inputTextScrollHandler)
    })
    renderContainerEle.addEventListener('scroll', renderContainerScrollHandler)

    return ()=>{
      inputTextEle.removeEventListener('scroll', inputTextScrollHandler)
      renderContainerEle.removeEventListener('scroll', renderContainerScrollHandler)
    }
  },[])


    return (
      <Form  form={form} className=' h-full'>
        <div className='app flex flex-wrap'>
          <div className="header w-full flex h-10 bg-slate-300">
                <Link to='..' className=' flex items-center font-bold cursor-pointer '>
                  <img src={HomeSvg} className=' w-5' alt="" />
                  主页
                </Link>
                <Drawer setForm={setForm}/>
                <Form.Item 
                  name='title'
                  label='标题：' className=' font-bold mx-2 flex h-full items-center'>
                      <Input type='text' className='rounded-none h-full bg-inherit' style={{
                        boxShadow: 'none',
                        border: 'none',
                        borderBottom: '1px solid #7d7878'
                      }} />
                </Form.Item>
                <span className=' flex items-center font-bold'>
                   标签: &nbsp;
                   <MakeLabels labels={labels} setLabels={setLabels} maxWidth='250px'/>
                </span>
                  <span className=' rounded-lg ml-2 px-4 whitespace-nowrap h-10 leading-10 text-black font-bold cursor-pointer' onClick={onSubmit}>提交</span>
          </div>
          <div className="input-container">
            <Form.Item name='inputText' noStyle
            rules={[
                  {
                    required: true,
                    message: '请填写内容'
                  }
                ]} >
                <Input.TextArea   
                onChange = {(e)=>{
                      setParsedData({
                        __html: marked.parse(e.target?.value)
                      })
                    }}
                    placeholder="输入markdown 格式文档"
                    style={{
                      resize: 'none'
                    }}
                    className='inputText'
                  />
            </Form.Item>
          </div>
          <div className="out-container" >
              <div className="render-container overflow-y-scroll" dangerouslySetInnerHTML={parsedData}>
            </div>
          </div>
        </div>
      </Form>

    )
}

export default Editor