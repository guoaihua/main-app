import React, { useEffect, useState } from 'react';
import './index.scss';
import * as Api from '@api/index'
import Label from "@imgs/label.svg";
import Time from "@imgs/time.svg";
import dayjs from 'dayjs'


/** 主页显示最近列表信息 */
const HomeCardList = ()=>{
const [blogList, setBlogList] = useState([])
  useEffect(()=>{
    ;(async()=>{
        const res =  await Api?.GetBlogList()
        setBlogList(res)
    })()
  },[])

  return (
      <>
        {
          blogList?.map((i, index)=>{
            return (
              <div className='blog_card' key={index}>
                <h2>{i?.title}</h2>
                <p className='blog_content'>{i?.content}</p>
                <div className="blog_footer">
                  <span><img src={Time} alt="" />{dayjs(i?.updateTime)?.format('YYYY-MM-DD')}</span>
                  {
                    i?.labels?.split(',')?.map((items,labelIndex) => {
                    return (
                      <span key={labelIndex}>
                        <img src={Label} alt="" />
                        {items}
                      </span>)
                    })
                  }
                  <span className='text_number'>一共{i?.content?.length}字，读完大约{(i?.content?.length/400)?.toFixed(2)}分钟</span>
                </div>
              </div>
            )
          })
        }
      </>
  )
}
export default HomeCardList