/* eslint-disable @typescript-eslint/no-explicit-any */
// import { redirect } from 'next/navigation'
import postAnswer from '@/app/service/answer'
import { NextResponse, NextRequest } from 'next/server'
import { redirect } from 'next/navigation'


function genAnswerInfo(formData: any) {
    // const formDataList = [...formData.entries()]
    const answerList = []
    for (const [key, value] of formData.entries()) {
        console.log(key, value)
        if (key !== 'questionId') {
            answerList.push({
                componentId: key,
                value
            })
        }

    }
    return {
        questionId: formData.get('questionId'),
        answerList
    }
}


export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return NextResponse.redirect(new URL(`/error`, request.url))
    }
    const formData = await request.formData()
    const answerInfo = genAnswerInfo(formData)
    const data = await postAnswer(answerInfo)
    // console.log(data)
    if (data.code !== 0) {
        redirect('/error')
    }
    // 提交成功
    redirect(`/success`)
    // return NextResponse.redirect(new URL('/success', request.url), { status: 307 })
    // try {
    //     // 提交失败
    //     await postAnswer(answerInfo)
    //     redirect('/success')
    //     // console.log(data)
    //     // if(data.code !== 0){
    //     //     return NextResponse.redirect(new URL(`/error`,request.url))
    //     // }
    //     // // 提交成功
    //     // // redirect(`/success`)
    //     // return NextResponse.redirect(new URL('/success', request.url),{ status: 307 })

    // } catch (error) {
    //     console.error(error)
    //     // return NextResponse.redirect(new URL(`/error`,request.url))
    // }
    // return Response.json({ code: 200, message: 'success' });
}