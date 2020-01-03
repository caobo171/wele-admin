import React, { useState } from 'react'
import axios from 'axios'

const Test = () => {

    const [file, setFile] = useState<File | null>(null)

    const [text, setText] = useState('')

    const onSubmitHandle = async () => {

        let isLast = false
        let resultString = ''
        let i = 0
        while (!isLast) {
            const formData = new FormData()
            if (file) {
                formData.append('file', file)
            }
            formData.append('transcript', text)
            formData.append('offset', i.toString())
            formData.append('chunk_duration', '5')
            formData.append('chunks', '10')

            const res = await axios.post('/api/file',
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 60 * 2 * 1000
            })


            if (res && res.data.last) {
                isLast = true
            }
            if (res && res.data.result) {
                i = i + Number(res.data.chunks)
                const tempResult = res.data.result

                if (resultString === '') {
                    resultString = tempResult
                } else {
                    
                    const resultArray = resultString.split(/[\s\n]/g).filter((e:string)=> e!=="")
                    const tempResultArray = tempResult.split(/[\s\n]/g).filter((e:string)=> e!=="")

                    console.log(resultArray, tempResultArray)
                    resultString = ''
                    for (let i = 0; i < resultArray.length; i++) {
                        if (resultArray[i] !== tempResultArray[i]) {
                            resultString = resultString + ' ' +
                                (resultArray[i].length > tempResultArray[i].length ? resultArray[i] : tempResultArray[i])
                        } else {
                            resultString = resultString + ' ' + resultArray[i]
                        }
                    }
                }
            }
        }

        console.log(resultString)
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