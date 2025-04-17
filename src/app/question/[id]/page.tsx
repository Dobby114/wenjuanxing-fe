import React, { FC } from "react";
 import styles from './page.module.scss'

 import { Metadata } from "next"
 import getQuestion from "@/app/service/question";
 import { redirect } from "next/navigation";
import genComponents from "@/app/components/QuestionComponents";
//  import Error from "@/app/error/page";

 
 export async function generateMetadata({params}:{params:Promise<{id:string}>}): Promise<Metadata> {
    const result = await params
    const questionId = result.id
    const questionInfo:questionInfoType = await getQuestion(questionId)
    const{title} = questionInfo.data

   return {
     title:`填写问卷--${title}`,
   }
 }


type questionInfoType={
    code:number,
    data:{
        _id: number,
        title: string,
        desc: string,
        js: string,
        css: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        componentsList: Array<{[key:string]:any}>
        isPublished: boolean,
        isDelete: boolean,
    },
    msg:string,
}
type params=Promise<{id:string}>

const Question: FC<{params:params}> = async (props:{params:params}) => {
    try{
        const data = await props.params
        // 根绝questionId从后端获取问卷数据
        const questionInfo:questionInfoType = await getQuestion(data.id)
        const {code,data:questionData} = questionInfo
        const {_id:id,js='',css='',isDelete,isPublished,componentsList} = questionData|| {}
        if(code !== 0){
            throw new Error('获取问卷数据失败')
        }else if(isDelete){
            throw new Error('问卷已删除')
        }else if(!isPublished){
            throw new Error('问卷未发布')
        }else{
            const componentElem = <>{componentsList.map((item)=>{
                const Component=genComponents(item)
                return Component?<div className={styles.componentWrapper} key = {item.fe_id}>{Component}</div>:null
            })}</>
            return <>
            <form method="post" action="/api/answerSubmit">
                <input name='questionId' value={id} type="hidden"></input>
                {componentElem}
              <div className={styles.submit}>
                    <button type="submit">提交</button>
                </div>
            </form>
            <script id="page-js">{js}</script>
            {/* 没找到单独修改每个页面head的方法，采用script的方式将css插入到head中 */}
            <script id="page-js">{`const style = document.createElement('style');style.innerHTML = ${css};document.head.appendChild(style);`}</script>
          </>
        }
    }catch(err){
        console.error(err)
        redirect('/error')
    }
}

export default Question
