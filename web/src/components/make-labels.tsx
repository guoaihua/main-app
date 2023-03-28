
/**
 * 1、显示一个输入框，提示请输入标签
 * 2、点击回车创建一个label
 * 3、按删除键或者label上的取消可以取消
 * 4、value以数组的形式显示['cloud', 'wind']
 * @returns 
 */

import React, {useState, useRef, useEffect, useCallback } from 'react'
import CloseIcon from '@imgs/close.svg'
import CopyIcon from '@imgs/copy.svg'
import { message } from 'antd'
export interface MakeLabelsProps {
    labels: string[]
    setLabels: (props: string[])=>void
}

const MakeLabels: React.FC<MakeLabelsProps> = (props)=>{
    const {labels, setLabels} = props
    const [inputValue, setInputValue] = useState('')
    const deleteLabels = (e)=>{
        const elementTarget = e.target as HTMLElement
        if(elementTarget?.tagName?.toLowerCase() === 'img'){
            const index = +elementTarget?.dataset?.index
            const newLabelList = [...labels];
            newLabelList.splice(index, 1)
            setLabels(newLabelList)
        }
    }
    return (
        <>
            <div className="border-indigo-300 rounded flex  items-center h-10  text-black px-2 overflow-x-auto" style={{borderWidth: '1px'}}>
                <div className=' inline-flex ' onClick={deleteLabels}>
                    {
                        labels?.map((i, index)=><div className=' bg-gray-100 pl-2 pr-5 py-1 rounded-sm  flex ml-2 whitespace-nowrap'>{i} <img data-index={index} src={CloseIcon} alt="" className=' w-5 h-5 cursor-pointer'/></div>)
                    }
                </div>
                <div className="inline-flex w-full h-full justify-between">
                    <input  
                        onKeyDown={(e)=>{
                            if(e.key === 'Enter' && inputValue){
                                setLabels([...labels, ...inputValue.split(";")])
                                setInputValue('')
                            }else if(e.key === 'Backspace' && labels?.length>0 && !inputValue){
                                const newLabelList = [...labels]
                                newLabelList?.pop()
                                setLabels(newLabelList)
                            }

                        }} 
                        type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='请输入标签' 
                        className=' flex-grow border-none outline-none ml-1' 
                    />
                    <img src={CopyIcon} alt="" className=' w-5 cursor-pointer ' onClick={async()=>{
                        await navigator.clipboard.writeText(labels.join(';'))
                        message.success('success copied!')
                    }} />
                </div>

            </div>
        </>
    )
}

export default MakeLabels