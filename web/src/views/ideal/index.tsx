
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
    return (
      <Form  form={form} className=' h-full'>
        <div className='app'>
              <div className="input-container">
        <div className="menu" >
          <Drawer />
          <Form.Item 
            name='title'
            label='标题：' rules={[
                {
                  required: true,
                  message: '请填写标题'
                }
              ]} className=' ml-10 mb-0'>
                <Input type='text' className=' rounded border-blue-500 border-solid border-2' />
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
                placeholder="Controlled autosize"
                style={{
                  height: '100%',
                  resize: 'none'
                }}
              />
        </Form.Item>
  
      </div>
        <div className="out-container" >
            <div className="menu ">
                <MakeLabels labels={labels} setLabels={setLabels}/>
                <Button className='  rounded-lg font-bold  ml-2 px-4 whitespace-nowrap h-10' onClick={onSubmit}>提交</Button>
            </div>
            <div className="render-container" dangerouslySetInnerHTML={parsedData}>
          </div>
        </div>
      </div>
      </Form>

    )
}

export default Editor