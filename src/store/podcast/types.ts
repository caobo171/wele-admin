import { NarratorType } from "@/components/SelecUser";

export interface PodcastType{
    source : string,
    imgUrl: string,
    name: string,
    narrator: NarratorType,
    postDate: number,
    description: string,
    fileSize: number,
    downloadLink: string,
    id?: string,
    hint?:string,
    result?: string
}

export interface State {
    listPodcasts: Map<string, PodcastType>
}