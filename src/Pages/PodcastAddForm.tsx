import React, { useState } from 'react'
import PodcastType from 'models/Podcast'
import uuid from 'uuid';
import * as firebase from 'firebase/app'

import { toast } from 'react-toastify'

import { useEffectOnce } from "react-use"
import NotificationType from 'models/Notification';

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
        (async () => {
            const snapshot = await firebase.firestore().collection('podcasts').get()
            console.log('check snapshot', snapshot)
        })()

    })

    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        if (props.user) {
            const podcast: PodcastType = {
                source,
                fileSize,
                narrator: props.user,
                postDate: new Date(),
                description: description.replace(new RegExp('\n', 'g'), '<br>'),
                imgUrl,
                name
            }

            await firebase.firestore().collection('podcasts').add(podcast)

            const notification: NotificationType = {
                imgUrl: 'https://static.wixstatic.com/media/29b9a8_05dd638ec28a4b26826c557f0bc92d7f~mv2.jpg/v1/fit/w_2500,h_1330,al_c/29b9a8_05dd638ec28a4b26826c557f0bc92d7f~mv2.jpg',
                message: `Wele has posted ${podcast.name} , Let's start listening !! `,
                sender: props.user,
                time: new Date(),
                title: 'Podcast This Week',
                type: 'weekly_podcast'
            }
            await firebase.firestore().collection('notifications').add(notification)
            await toast.success('ADD SUCCESSFULLY !! ')
        } else {
            toast.error("YOUR ARE NOT LOGGINED ")
        }
    }


    const onSubmitNotificationHandler = async (e: any) => {
        e.preventDefault()
        const notification: NotificationType = {
            imgUrl: notificationImage,
            message: notificationMessage,
            sender: props.user,
            time: new Date(),
            title: notificationTitle,
            type: notificationType
        }
        await firebase.firestore().collection('notifications').add(notification)
        await toast.success('ADD SUCCESSFULLY !! ')

        console.log('check notification', notification)
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