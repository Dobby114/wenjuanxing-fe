const HOST = 'http://localhost:3003';

export async function get(url:string){
    const res = await fetch(HOST + url)
    const result = res.json()
    return result
}

export async function post(url:string, data:object){
    const res = await fetch(HOST + url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const result = res.json()
    return result
}