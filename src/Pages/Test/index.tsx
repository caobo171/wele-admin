import React, { useState } from 'react'
import axios from 'axios'

const Test = () => {

    const [file, setFile] = useState<File | null>(null)

    const [text, setText ] = useState('')

    const onSubmitHandle = async () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }

        formData.append('transcript',text)
        const res = await axios.post('/api/file',
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout:60*20*1000
        })

        console.log(res)
    }
    return <div>
        {/* <form action="/api/file" method="POST"  encType="multipart/form-data"> */}
        <input type="file" name="file" onChange={(e) => {
            setFile(e.target.files ? e.target.files[0] : null)
        }} />
        <textarea value={text} onChange={(e)=>{
            setText(e.target.value)
        }}/>
        <input type="submit" onClick={onSubmitHandle} value="Send File" />
        {/* </form> */}
    </div>
}


export default Test