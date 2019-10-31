import React, { useState } from 'react'
import PodcastType from 'models/Podcast'
import uuid from 'uuid';



const PodcastAddForm = () => {

    const [description, setDescription] = useState('')

    const [fileSize, setFileSize] = useState(-1)
    const [imgUrl, setImgUrl] = useState('')
    const [name, setName] = useState('')
    const [narrator, setNarrator] = useState('')

    const [source, setSource] = useState('')


    const onSubmitHandler = ()=>{

        const podcast: PodcastType  = {
            source,
            fileSize,
            narrator,
            postDate: new Date(),
            description,
            imgUrl,
            name,
            id: uuid()
        }

        console.log('check podcast ', podcast)
    }
    return (
        <React.Fragment>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label >Podcast Name</label>
                        <input className="form-control" type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            required />
                    </div>
                </div>
                <div className="form-group">
                    <label >Narrator</label>
                    <input type="text" className="form-control" required
                        value={narrator}
                        onChange={(e) => {
                            setNarrator(e.target.value)
                        }} />
                </div>
                <div className="form-group">
                    <label>ImageUrl</label>
                    <input type="text" className="form-control" required
                        value={imgUrl}
                        onChange={(e) => {
                            setImgUrl(e.target.value)
                        }} />
                </div>
                <div className="form-group">
                    <label>Source</label>
                    <input type="text" className="form-control" required
                        value={source}
                        onChange={(e) => {
                            setSource(e.target.value)
                        }} />
                </div>

                <div className="form-group">
                    <label>File</label>
                    <input type="file" className="form-control" required onChange={(e) => {
                        if (e.target.files) {
                            const fileSize = e.target.files[0]
                            setFileSize(fileSize.size)
                        }

                    }} />
                </div>


                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" required
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }} />

                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Add</button>
            </form>
        </React.Fragment>

    )
}

export default PodcastAddForm;