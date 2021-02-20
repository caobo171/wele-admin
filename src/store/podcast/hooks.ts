import { useSelector } from "react-redux"
import { PodcastType } from "./types"

export const usePodcastList = ()=>{
    return useSelector((state:any)=> [...state.podcast.listPodcasts.values()] as PodcastType[])
}

export const usePodcastById = (id: string)=>{
    return useSelector((state:any)=> state.podcast.listPodcasts.get(id))
}