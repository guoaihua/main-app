import React, { useEffect, useState } from 'react';
import './App.scss';
import { marked } from 'marked'
import 'antd/dist/reset.css';
import { Input } from 'antd'


function App() {
  const [inputText, setInputText] = useState('')
  const [parsedData, setParsedData] = useState({
    __html: ''
  })

  useEffect(()=>{
    setParsedData({
      __html: marked.parse(inputText)
    })
  },[inputText])
  
  return (
    <div className="App">
      <div className="input-container">
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
      <div className="render-container" dangerouslySetInnerHTML={parsedData}>

      </div>
    </div>
  );
}

export default App;
