
import React, { useEffect, useState } from 'react';
import './index.scss';
import { marked } from 'marked'
import 'antd/dist/reset.css';
import { Input, Button, message } from 'antd'
import Drawer from '@components/customer-drawer'
import  * as Api from '../../api/index'
import MakeLabels from '@components/make-labels';

const Editor = ()=>{
    const [inputText, setInputText] = useState('')
    const [title, setTile] = useState('')
    const [label, setLabel] = useState([])
    const [parsedData, setParsedData] = useState({
      __html: ''
    })
  
    useEffect(()=>{
      setParsedData({
        __html: marked.parse(inputText)
      })
    },[inputText])
  
  const handleSubmit = async ()=>{
    if(title && inputText && parsedData){
      const res = await Api?.AddNewBlog({
        title,
        content: inputText,
        parseContent: parsedData.__html,
        labels: label.join(';'),
        updateTime: Date.now()
      })
      if(res){
        message.success('保存成功')
        setInputText('')
        setTile('')
        setLabel([])
        setParsedData({
          __html: ''
        })
      }
    }
  }
    return (
        <div className='app'>
              <div className="input-container">
        <div className="menu" >
          <Drawer />
          <div className='title'>
              标题：<Input type='text' value={title} onChange={(e)=>setTile(e.target.value)}></Input>
          </div>
        </div>
        <Input.TextArea        
          value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Controlled autosize"
            style={{
              height: '100%',
              resize: 'none'
            }}
          />
      </div>
        <div className="out-container" >
            <div className="menu">
                <MakeLabels onChange={(data)=> setLabel(data)}/>
                <Button className=' ml-2 h-9' onClick={handleSubmit}>保存当前文档</Button>
            </div>
            <div className="render-container" dangerouslySetInnerHTML={parsedData}>
          </div>
        </div>
      </div>
    )
}

export default Editor