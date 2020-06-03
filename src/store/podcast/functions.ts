import store from '../store'

import * as actions from './actions'
import { User } from 'firebase'
import * as firebase from 'firebase/app'
import { PodcastType } from './types'
import { idText } from 'typescript'
import { toast } from 'react-toastify'
import { AppRouterContext } from '@/navigation/AppRouter'
import { NarratorType } from '@/components/SelecUser'


const PODCAST_COLLECTION = 'podcasts'
const NOTIFICATIONS_COLLECTION = 'notifications'

interface Notification{
    imgUrl: string,
    message: string,
    sender: NarratorType,
    time: Date,
    title: string,
    type: 'weekly_podcast' | 'unknown'
}

export const addPodcast = async (podcast: PodcastType, storex = store) => {

    const res = await firebase.firestore().collection(PODCAST_COLLECTION).add(podcast)

    const noti: Notification={
        imgUrl: podcast.narrator.photoURL as string,
        message: `${podcast.name} ESL is posted !! Let listen <3 <3`,
        sender:podcast.narrator,
        time: new Date(podcast.postDate),
        title: 'Weekly Podcast',
        type: 'weekly_podcast'
    }
    await firebase.firestore().collection(NOTIFICATIONS_COLLECTION).add(noti)

    if (res) {
        toast.success('Podcast Added Successful !!')
        AppRouterContext.ref.props.history.push('/')
        return storex.dispatch(actions.addPodcast({ ...podcast, id: res.id }))
    }
}


export const getPodcasts = async (storex = store) => {
    const querySnapshots = await firebase.firestore().collection(PODCAST_COLLECTION).get()
    let data = new Map<string, PodcastType>()
    querySnapshots.forEach((doc: any) => {
        data = data.set(doc.id, { id: doc.id, ...doc.data() })
    });

    return await storex.dispatch(actions.getPodcasts(data))
}

export const deletePodcast = async (podcast: PodcastType, storex = store) => {
    await firebase.firestore().collection(PODCAST_COLLECTION).doc(podcast.id).delete()

    toast.error('Podcast Deleted Successful !!')
    AppRouterContext.ref.props.history.push('/')
    return await storex.dispatch(actions.deletePodcast(podcast))


}


export const editPodcast = async (podcast: PodcastType, storex = store) => {
    const { id, ...rest } = podcast
    await firebase.firestore().collection(PODCAST_COLLECTION).doc(podcast.id).update({
        ...rest
    })
    toast.success('Podcast Updated Successful !!')
    AppRouterContext.ref.props.history.push('/')
    return await storex.dispatch(actions.editPodcast(podcast))
}


