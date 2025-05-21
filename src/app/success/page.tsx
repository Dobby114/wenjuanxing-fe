import React,{FC} from 'react'
import { Metadata } from "next"


export const metadata: Metadata = {
    title: '提交成功！',
  }

type propsType=Promise<{info:string}>
const Success:FC<{params:propsType}> = async (props:{params:propsType})=>{
    const { info } = await props.params
    return <><div>成功页面</div>
    <div>{info}</div></>
}

export default Success