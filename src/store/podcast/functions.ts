import store from '../store'

import * as actions from './actions'
import { User } from 'firebase'
import * as firebase from 'firebase/app'
import { PodcastType } from './types'


const PODCAST_COLLECTION = 'podcasts'

export const addPodcast = async (podcast: PodcastType, storex = store) => {

    const res = await firebase.firestore().collection(PODCAST_COLLECTION).add(podcast)

    if(res){
        return storex.dispatch(actions.addPodcast(podcast))
    }
}


export const listPodcast = async (storex = store)=>{
    const snapshot = await firebase.firestore().collection(PODCAST_COLLECTION).get()

    if(snapshot){
        window.snapshot = snapshot
    }
}


