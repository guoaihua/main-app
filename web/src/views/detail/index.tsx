import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './index.scss'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import BackTop from '@imgs/back-top.svg';

const ArticalDetail = ()=>{
    const location = useLocation()
    const blogInfo = location?.state?.articalDetail


    useEffect(()=>{
      document.querySelectorAll('pre code').forEach((el: HTMLElement) => {
        hljs.highlightElement(el);
      });
    },[blogInfo?.content])

    const backTop = ()=>{
    //   window.scrollTo({
    //     left: 0,
    //     top: 0,
    //     behavior: 'smooth'
    // })
      // let top = document.documentElement.scrollTop || document.body.scrollTop
      const ele = document.querySelector('.artical_container')
      let top = ele?.scrollTop
      if(top > 0){
          window.requestAnimationFrame(backTop)
          ele?.scrollTo(0, top * 0.9)
      }
    }
    
    return (
      <div className=" w-full py-5 px-8 bg-gray-100 overflow-scroll artical_container" style={{height: 'calc(100% - 46px)'}}>
        <div className=" flex items-center justify-center flex-col bg-white px-8 py-5 rounded-lg">
          <img src={BackTop} alt="" className=" fixed bottom-5 right-5 w-7 cursor-pointer" onClick={backTop}/>
          <h1 className=" py-5 ">{blogInfo?.title}</h1>
          {blogInfo?.parseContent &&  <div  dangerouslySetInnerHTML={{__html: blogInfo.parseContent}}/>}
        </div>
      </div>

    )
}

export default ArticalDetail