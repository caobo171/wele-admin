import { useSelector } from "react-redux"

export const usePodcastList = ()=>{
    return useSelector((state:any)=> [...state.podcast.listPodcasts.values()])
}

export const usePodcastById = (id: string)=>{
    return useSelector((state:any)=> state.podcast.listPodcasts.get(id))
}