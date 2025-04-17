import React,{FC} from 'react'
import { Metadata } from "next"


export const metadata: Metadata = {
    title: '提交成功！',
  }

  type propsType={info:string}
const Success:FC<propsType> = (props:propsType)=>{
    const { info } = props
    return <><div>成功页面</div>
    <div>{info}</div></>
}

export default Success