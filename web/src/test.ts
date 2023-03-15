






export const fetchData = <T = any>(func: () => Promise<T>)=>{
    return new Promise<T>((resolve, reject)=> resolve(func()))
}

const getDtail = ()=> {
    return new Promise<{data: string, title: number}>((resolve, reject)=> resolve({
        data: '1131',
        title: 1231
    })).then((res)=>{
        return {
            data: '131',
            title: 2313
        }
    })
}
let b
const res = fetchData(getDtail)
type UnPromise<T> =  T extends Promise<infer U> ? U : never;
type a = UnPromise<typeof res>
console.log((b as a)?.data)