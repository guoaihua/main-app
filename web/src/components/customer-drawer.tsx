import { ReactSVG } from 'react-svg'
import BookSvg from '../imgs/book.svg'
import { useToggle } from 'ahooks';
import { Drawer, Divider, Modal} from 'antd'
import * as Api from '../api'
import { useCallback, useEffect, useState } from 'react';
import BlogList from './drawer-blog-list';

const CustomerDrawer = ({setForm})=>{
    const [showDrawer, {toggle, setLeft}] = useToggle()
    const [blogList, setBlogList] = useState([])
    useEffect(()=>{
        fetchBlogList()
    },[showDrawer])

    const fetchBlogList = async ()=>{
        const res =  await Api?.GetBlogList({})
        console.log(res)
        setBlogList(res.list)
    }

    const Tools = useCallback(({data})=>{
        const deleteBlog = ()=>{
          const modal = Modal.confirm({
                title: '是否确定删除？',
                content: `删除当前数据${data?.title}`,
                async onOk(){
                    const res = await Api?.DeleteBlog({blogId: data?.id})
                    console.log('delete', data, res)
                    await fetchBlogList()
                    modal.destroy()
                },
                className: 'mr-2'
            })
        }

        const editBlog = ()=>{
            console.log(setForm)
            setForm(data, true)
            setLeft()
        }
        return (
            <div className=' inline-block '>
                <button className=' bg-red-400 px-2 py-1 text-white rounded mr-1' onClick={deleteBlog}>删除</button>
                <button className=' bg-blue-300 px-2 py-1 text-white rounded' onClick={editBlog}>编辑</button>
            </div>
        )
    },[])




    return (
        <>
        <span className='flex items-center cursor-pointer font-bold mx-2' onClick={toggle}>
                <ReactSVG className='drawer' src={BookSvg} /> 
                    查看全部
        </span>
        <Drawer title="文章列表" placement="right" onClose={setLeft} open={showDrawer} >
            <BlogList blogList={blogList} Tools={Tools}/>
        </Drawer>
        </>
    )
}
export default CustomerDrawer