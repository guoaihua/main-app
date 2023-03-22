
/**
 * 1、显示一个输入框，提示请输入标签
 * 2、点击回车创建一个label
 * 3、按删除键或者label上的取消可以取消
 * 4、value以数组的形式显示['cloud', 'wind']
 * @returns 
 */

import {useState, useRef, useEffect, useCallback} from 'react'
import CloseIcon from '@imgs/close.svg'

const MakeLabels = ()=>{
    const [labels, setLabels] = useState([])
    const [inputValue, setInputValue] = useState('')


    return (
        <>
            <div className=" border-2  border-blue-400 rounded flex  items-center h-10  text-black px-2">
                <div className=' inline-flex '>
                    {
                        labels?.map(i=><div className=' bg-gray-50 mr-1 flex clear-both'>{i} <img src={CloseIcon} alt="" className=' w-5 h-5 cursor-pointer'/></div>)
                    }
                </div>
                <input  onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        setLabels([...labels, inputValue])
                        setInputValue('')
                    }
                }} type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='请输入标签' className=' w-full h-full border-none outline-none' />
            </div>
        </>
    )
}

export default MakeLabels