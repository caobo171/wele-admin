import { NarratorType } from "@/components/SelecUser";

export interface PodcastType{
    source : string,
    imgUrl: string,
    name: string,
    narrator: NarratorType,
    postDate: Date,
    description: string,
    fileSize: number,
    uri?: string
    id?: string
}

export interface State {
    listPodcasts: Map<string, PodcastType>
}