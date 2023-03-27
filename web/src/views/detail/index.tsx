import { useLocation } from "react-router-dom";
import './index.scss'

const ArticalDetail = ()=>{
    const location = useLocation()
    console.log(location?.state)
    return (
        <>
          {location?.state?.articalDetail?.parseContent &&  <div  dangerouslySetInnerHTML={{__html: location?.state?.articalDetail?.parseContent}}/>}
        </>
    )
}

export default ArticalDetail