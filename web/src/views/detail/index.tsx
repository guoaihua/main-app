import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './index.scss'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';

const ArticalDetail = ()=>{
    const location = useLocation()
    const blogInfo = location?.state?.articalDetail
    console.log(location?.state)
    useEffect(()=>{
      const ele = document?.querySelector('.App .personal_info');
    }, [])

    useEffect(()=>{
      document.querySelectorAll('pre code').forEach((el: HTMLElement) => {
        hljs.highlightElement(el);
      });
    },[blogInfo?.content])
    
    return (
      <>
        <MarkNav source={blogInfo?.content} />
        <div className=" flex items-center justify-center p-5 flex-col">
          <article className="article">
          <h1>{blogInfo?.title}</h1>
          {blogInfo?.parseContent &&  <div  dangerouslySetInnerHTML={{__html: blogInfo.parseContent}}/>}
          </article>
        </div>
      </>

    )
}

export default ArticalDetail