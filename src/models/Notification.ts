export default interface NotificationType {
    imgUrl: string,
    message: string,
    sender? : string,
    time: Date,
    title: string
    type : 'weekly_podcast' | 'unknown'


}