import { action, createAction } from "typesafe-actions"
import { PodcastType } from "./types"



export const addPodcast = createAction('podcast/add' , 
(podcast: PodcastType)=> (podcast))<PodcastType>()

export const deletePodcast = createAction('podcast/delete' , 
(podcast: PodcastType)=> (podcast))<PodcastType>()

export const editPodcast = createAction('podcast/edit',
(podcast: PodcastType)=>(podcast))<PodcastType>()


export const getPodcasts = createAction('podcast/list',
(podcasts: Map<string, PodcastType>)=>(podcasts))<Map<string, PodcastType>>()

