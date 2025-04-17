import {get} from './ajax'


export default function getQuestion(id:string) {
    const url = `/api/question/${id}`
    const result = get(url)
    return result
}