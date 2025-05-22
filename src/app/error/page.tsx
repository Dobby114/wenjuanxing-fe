import React, { FC } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: '出错啦！',
}
type propsType = Promise<{ info: string }>
const Error: FC<{ params: propsType }> = async (props: { params: propsType }) => {
  const { info } = await props.params
  return <div className={styles.main}>
    <Image property='true' src="/Error-page.svg" alt="icon" width={300}
      height={300} />
      <h3 style={{color:'red'}}>出错啦！请稍后再试！</h3>
      <div>{info}</div>
  </div>
}

export default Error