import React,{FC} from 'react'
import { Metadata } from "next"
import Image from 'next/image'
import styles from './page.module.scss'


export const metadata: Metadata = {
    title: '提交成功！',
  }

type propsType=Promise<{info:string}>
const Success:FC<{params:propsType}> = async (props:{params:propsType})=>{
    const { info } = await props.params
    return <div className={styles.main}>
    <Image property='true' src="/Task done.svg" alt="icon" width={300}
      height={300} />
      <h3 style={{color:'#56CF86'}}>提交成功！</h3>
      <div>{info}</div>
  </div>
}

export default Success