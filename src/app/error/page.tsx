import React,{FC} from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '出错啦！', 
  }
type propsType={info:string}
const Error:FC<{params:propsType}> = ({params}:{params:propsType})=>{
    const { info } = params
    return <>
    <div>出错页面</div>
    <div>{info}</div></>
}

export default Error