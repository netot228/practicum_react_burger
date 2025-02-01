export function checkResponse(res: Response){
    if (res.ok) {
        return Promise.resolve(res.json())
    } else if(res.status===401 || res.status===403) {
        return Promise.resolve(res.json())
    } else {
        return Promise.reject(res.status)
    }
}

export async function requestHandler(url:string, options: RequestInit){
    return await fetch(url, options).then(checkResponse)
}
