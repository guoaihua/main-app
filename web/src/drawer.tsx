import { ReactSVG } from 'react-svg'
import BookSvg from './imgs/svgs/book.svg'
import { useToggle } from 'ahooks';
import { Input, Drawer} from 'antd'


const CustomerDrawer = ()=>{
    const [showDrawer, {toggle, setLeft}] = useToggle()
    return (
        <>
        <ReactSVG className='drawer' src={BookSvg} onClick={toggle}/> 

        
            <Drawer title="Basic Drawer" placement="right" onClose={setLeft} open={showDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
        </>
    )
}
export default CustomerDrawer