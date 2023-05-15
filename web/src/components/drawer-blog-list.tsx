import { Drawer, Divider, Modal} from 'antd'
import { useEffect } from 'react'
const BlogList = ({blogList, Tools})=>{
    useEffect(()=>{
        const ele = document.querySelector('.ant-drawer-body')
        let preHeight = 0;
        const handler = (e)=>{
            console.log(e)
            const target = e.target as HTMLElement
            const rect = target?.getBoundingClientRect()

            if(target?.scrollTop < preHeight){
                console.log('向上滚动')
                preHeight = target?.scrollTop
                return 
            }
            preHeight = target?.scrollTop
            if((target?.scrollTop + rect?.height) >= target?.scrollHeight - 50  ){
                console.log('达到边界, 开始加载数据')
            }
        }
            
        ele?.addEventListener('scroll',handler)
        return ()=>{ ele?.removeEventListener('scroll', handler)}
    },[])

    return blogList?.map((i, index)=>{
        return (
        <div key={index}>
            <h1 className='flex justify-between items-center'>{i?.title} <Tools data={i}/></h1>
            <p className='customer_ellisis leading-5 '>{i?.content}</p>
            <Divider />
        </div>)
    })
}

export default BlogList