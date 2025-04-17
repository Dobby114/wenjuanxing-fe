/* eslint-disable @typescript-eslint/no-explicit-any */
// import { redirect } from 'next/navigation'
import postAnswer from '@/app/service/answer'
import { NextResponse, NextRequest } from 'next/server'


function genAnswerInfo(formData:any){
    // const formDataList = [...formData.entries()]
    const answerList=[]
    for (const [key, value] of formData.entries()) {
        console.log(key, value)
        if(key!=='questionId'){
            answerList.push({
                componentId: key,
                value
            })
        }
            
    }
    return {
        questionId:formData.get('questionId'),
        answerList
    }
}


export async function POST(request:NextRequest) {
    if(request.method !== 'POST') {
       return NextResponse.redirect(new URL(`/error`,request.url))
    }
    const formData = await request.formData()
    const answerInfo = genAnswerInfo(formData)
    // 提交到服务器mock
    try {
        // 提交失败
        const data = await postAnswer(answerInfo)
        if(data.code !== 0){
            return NextResponse.redirect(new URL(`/error`,request.url))
        }
        // 提交成功
        return NextResponse.redirect(new URL('/success', request.url))

    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL(`/error`,request.url))
    }
    // return Response.json({ code: 200, message: 'success' });
  }