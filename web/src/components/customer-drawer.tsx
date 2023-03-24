import { ReactSVG } from 'react-svg'
import BookSvg from '../imgs/book.svg'
import { useToggle } from 'ahooks';
import { Drawer, Divider} from 'antd'
import * as Api from '../api'
import { useEffect, useState } from 'react';

const CustomerDrawer = ()=>{
    const [showDrawer, {toggle, setLeft}] = useToggle()
    const [blogList, setBlogList] = useState([])
    useEffect(()=>{
        ;(async()=>{
            const res =  await Api?.GetBlogList()
            console.log(res)
            setBlogList(res.list)
        })()
    },[showDrawer])


    return (
        <>
        <ReactSVG className='drawer' src={BookSvg} onClick={toggle}/> 
     <Drawer title="Basic Drawer" placement="right" onClose={setLeft} open={showDrawer}>
        {
            blogList?.map(i=>{
                return (<>
                    {i?.title}
                    <p>{i?.content}</p>
                    <Divider />
                </>)
            })
        }
      </Drawer>
        </>
    )
}
export default CustomerDrawer