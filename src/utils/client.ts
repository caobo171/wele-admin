import axios from 'axios'
export function savePage (shop:string,pageData:string,title:string){
   // console.log('check',shop,title,pageData)
    return new Promise((resolve,reject)=>{

        axios.post('/api/create-page',{shop,pageData,title}).then(data=>{
            console.log(data)
            resolve(data)
        })
    })
}