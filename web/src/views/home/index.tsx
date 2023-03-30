import React, { useEffect, useState } from 'react';
import './index.scss';
import * as Api from '@api/index'
import Label from "@imgs/label.svg";
import Time from "@imgs/time.svg";
import dayjs from 'dayjs'
import { Divider, PaginationProps } from 'antd';
import { Pagination } from "antd";
import {
  Link,
  useNavigate
} from "react-router-dom";


/** 主页显示最近列表信息 */
const HomeCardList = ()=>{
const [blogList, setBlogList] = useState([])
const [current, setCurrent] = useState(1)
const [total, setTotal] = useState(10)
const navigate = useNavigate()
const pageSize = 5;
  useEffect(()=>{
    ;(async()=>{
        const res =  await Api?.GetBlogList({
          pageSize,
          order_type: 'desc',
          current: current-1
        })
        setTotal(res.total)
        setBlogList(res.list)
    })()
  },[current])

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
      <div className='list overflow-y-auto'>
        {
          blogList?.map((i, index)=>{
            return (
              <div className='blog_card m-7' key={index}>
                <h2>{i?.title}</h2>
                <div className='blog_content cursor-auto text-gray-500' onClick={()=>{
                  console.log(i)
                  navigate('/article_detail', {
                    state: {
                      articalDetail: i
                    }
                  })
                }} dangerouslySetInnerHTML={{__html: i?.parseContent}}/>
                <div className="blog_footer text-gray-500">
                  <span><img src={Time} alt="" />{dayjs(i?.update_time)?.format('YYYY-MM-DD')}</span>
                  {
                    i?.labels?.split(';')?.map((items,labelIndex) => {
                    return (
                      <span key={labelIndex}>
                        <img src={Label} className='w-3 mr-1' alt="" />
                        {items}
                      </span>)
                    })
                  }
                  <span className='text_number'>一共{i?.content?.length}字，读完大约{(i?.content?.length/400)?.toFixed(2)}分钟</span>
                </div>
                 <Divider />
              </div>
            )
          })
        }
       {
        total>10 && <Pagination className=' m-7 ' total={total} pageSize={pageSize} current={current} onChange={onChange} showTotal={(total) => `Total ${total} items`} />
       } 
      </div>
  )
}
export default HomeCardList