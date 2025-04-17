import {post} from './ajax'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function postAnswer(answerInfo:any) {
    const url = '/api/answer'
    const result = await post(url,answerInfo)
    return result
}