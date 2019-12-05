import React, { useState } from 'react'
import * as firebase from 'firebase/app'
import { toast } from 'react-toastify'
import { useEffectOnce } from "react-use"
import { listPodcast } from '@store/podcast/functions';

interface Props {
    user: any
}

const PodcastAddForm = (props: Props) => {

    const [description, setDescription] = useState('')

    const [fileSize, setFileSize] = useState(-1)
    const [imgUrl, setImgUrl] = useState('')
    const [name, setName] = useState('')
    const [downloadLink, setDownloadLink] = useState('')

    const [source, setSource] = useState('')





    const [notificationTitle, setNotificationTitle] = useState('')

    const [notificationImage, setNotificationImage] = useState('')

    const [notificationMessage, setNotificationMessage] = useState('')

    const [notificationType, setNotificationType] = useState<"unknown" | "weekly_podcast">('unknown')



    useEffectOnce(() => {

        listPodcast()
    })

    const onSubmitHandler = async (e: any) => {
    }


    const onSubmitNotificationHandler = async (e: any) => {

    }
    return (
        <div className="row">
            <div className="col col-md-6 ">
                <React.Fragment>
                    <h1>ADD PODCAST </h1>
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
                            <label >DonwloadLink</label>
                            <input type="text" className="form-control" required
                                value={downloadLink}
                                onChange={(e) => {
                                    setDownloadLink(e.target.value)
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
                        </div>


                        <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Add</button>
                    </form>
                </React.Fragment>

            </div>
            <div className="col col-md-6 ">
                <h1>ADD NOTIFICATION </h1>
                <React.Fragment>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label >Notification Title</label>
                                <input className="form-control" type="text"
                                    value={notificationTitle}
                                    onChange={(e) => {
                                        setNotificationTitle(e.target.value)
                                    }}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Message</label>
                            <input type="text" className="form-control" required
                                value={notificationMessage}
                                onChange={(e) => {
                                    setNotificationMessage(e.target.value)
                                }} />
                        </div>
                        <div className="form-group">
                            <label>Image Url</label>
                            <input type="text" className="form-control" required
                                value={notificationImage}
                                onChange={(e) => {
                                    setNotificationImage(e.target.value)
                                }} />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select className="form-control" required
                                value={notificationType}
                                onChange={(e) => {
                                    setNotificationType(e.target.value as "unknown" | "weekly_podcast")
                                }} >
                                <option value="weekly_podcast">Weekly Podcast</option>
                                <option value="unknown">Unknown</option>
                            </select>
                        </div>


                        <button type="submit" className="btn btn-primary" onClick={onSubmitNotificationHandler}>Add</button>
                    </form>
                </React.Fragment>
            </div>
        </div >

    )
}

export default PodcastAddForm;