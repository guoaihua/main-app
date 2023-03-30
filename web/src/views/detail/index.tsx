import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './index.scss'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

const ArticalDetail = ()=>{
    const location = useLocation()
    const blogInfo = location?.state?.articalDetail
    console.log(location?.state)
    useEffect(()=>{
      const ele = document?.querySelector('.App .personal_info');
      console.log(ele)
    
    }, [])
    return (
        <div className=" flex items-center justify-center p-5 flex-col">
          <h1>{blogInfo?.title}</h1>
          {blogInfo?.parseContent &&  <div  dangerouslySetInnerHTML={{__html: blogInfo.parseContent}}/>}
        </div>
    )
}

export default ArticalDetail