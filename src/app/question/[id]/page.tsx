import React, { FC } from "react";
 import styles from './page.module.scss'

 import { Metadata } from "next"
 import getQuestion from "@/app/service/question";
 import { redirect } from "next/navigation";
import genComponents from "@/app/components/QuestionComponents";
//  import Error from "@/app/error/page";
import { componentPropsType } from "@/app/components/QuestionComponents";

 
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
        componentList: Array<componentPropsType>
        isPublished: boolean,
        isDeleted: boolean,
    },
    msg:string,
}
type params=Promise<{id:string}>

const Question: FC<{params:params}> = async (props:{params:params}) => {
    try{
        // 获取路径中的id params
        const data = await props.params
        console.log(data)
        // 根绝questionId从后端获取问卷数据
        const questionInfo:questionInfoType = await getQuestion(data.id)
        console.log(questionInfo)
        const {code,data:questionData} = questionInfo
        const {_id:id,js='',css='',isDeleted,isPublished,componentList} = questionData|| {}
        if(code !== 0){
            throw new Error('获取问卷数据失败')
        }else if(isDeleted){
            throw new Error('问卷已删除')
        }else if(!isPublished){
            throw new Error('问卷未发布')
        }else{
            const componentElem = <>{componentList.map((item)=>{
                const Component=genComponents(item)
                return Component?<div className={styles.componentWrapper} key = {item.fe_id}>{Component}</div>:null
            })}</>
            return <div className={styles.wrapper}>
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
          </div>
        }
    }catch(err){
        console.error(err)
        redirect('/error')
    }
}


export default Question
