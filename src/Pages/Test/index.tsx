import React, { useState } from 'react'
import axios from 'axios'
import { processResult } from '../../helper/utils'

const Test = () => {
    const [file, setFile] = useState<File | null>(null)
    const [text, setText] = useState('')
    const onSubmitHandle = async () => {
     
    }
    return <div>
        {/* <form action="/api/file" method="POST"  encType="multipart/form-data"> */}
        <input type="file" name="file" onChange={(e) => {
            setFile(e.target.files ? e.target.files[0] : null)
        }} />
        <textarea value={text} onChange={(e) => {
            setText(e.target.value)
        }} />
        <input type="submit" onClick={onSubmitHandle} value="Send File" />
        {/* </form> */}
    </div>
}


export default Test