
import React, { useEffect, useState } from 'react';
import './index.scss';
import { marked } from 'marked'
import 'antd/dist/reset.css';
import Drawer from '@components/customer-drawer'
import  * as Api from '../../api/index'
import MakeLabels from '@components/make-labels';
import { Form, Input, message, Button } from 'antd'

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

  
  const onSubmit = async ()=>{
    console.log(111)
    form.validateFields().then(async(values)=>{
      if(values && parsedData){
        const res = await Api?.AddNewBlog({
          title: values?.title,
          content: values?.inputText,
          parseContent: parsedData.__html,
          labels: labels.join(';'),
          updateTime: Date.now()
        })
        if(res){
          message.success('保存成功')
          form.resetFields()
          setLabels([])
          setParsedData({
            __html: ''
          })
        }
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  const setForm = (data)=>{
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
        <div className='app'>
          <div className="input-container">
            <div className="menu" >
              <Drawer setForm={setForm}/>
              <Form.Item 
                name='title'
                label='标题：' rules={[
                    {
                      required: true,
                      message: '请填写标题'
                    }
                  ]} className=' ml-10 mb-0'>
                    <Input type='text' className=' rounded-none p-0' style={{
                      boxShadow: 'none',
                      border: 'none',
                      borderBottom: '1px solid #d5cece'
                    }} />
              </Form.Item>
            </div>
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
              <div className="menu ">
                  <MakeLabels labels={labels} setLabels={setLabels}/>
                  <Button className=' rounded-lg font-bold  ml-2 px-4 whitespace-nowrap h-10' onClick={onSubmit}>提交</Button>
              </div>
              <div className="render-container overflow-y-scroll" dangerouslySetInnerHTML={parsedData}>
            </div>
          </div>
        </div>
      </Form>

    )
}

export default Editor