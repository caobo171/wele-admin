import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'
import { toast } from 'react-toastify'
import { useEffectOnce } from "react-use"
import { getPodcasts, addPodcast, deletePodcast } from '@store/podcast/functions';
import styled from 'styled-components'
import SelectControl from '@/components/SelectControl';
import SelectUser, { NarratorType } from '@/components/SelecUser';
import { useUser } from '@/store/user/hooks';
import SelectImage from '@/components/SelectImage';
import { PodcastType } from '@/store/podcast/types';
import { usePodcastList, usePodcastById } from '@/store/podcast/hooks';
import { AppRouterContext } from '@/navigation/AppRouter';
import { editPodcast } from '@/store/podcast/functions';


interface Props {
    user: any
}

const StyledWrapper = styled.div`
    width: 100%;
`

const StyledSubWrapper = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    flex:1;
    align-items: center;
`

const StyledBackToPodcastList = styled.div`
    margin-left: 80px;
    font-size: 16px;
    background-color: #595959;
    padding: 14px;
    border-radius: 22px;
    color: #fff;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`

const StyledDeletePodcast = styled.div`
    margin-right: 80px;
    font-size: 16px;
    background-color: #595959;
    padding: 14px;
    border-radius: 22px;
    color: #fff;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`

const StyledMainWrapper = styled.div`
    width: 94%;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StyledTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 40px;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: bold;
`

const StyledInputControl = styled.div`
    width: 60%;
    margin-bottom: 16px;
`

const StyledTextInput = styled.input`

    border-radius: 4px;
    border-width: 0px 0px 3px 0px;
    width: 400px;
    outline: none;

    &:focus {
        border-color: #93ff80;
    }
`

const StyledTextArea = styled.textarea`
    border-radius: 4px;
    border-color: rgba(0,0,0,0.1);
    border-width: 2px;
    width: 400px;
    height: 200px;
    outline: none;
    &:focus {
        border-color: #93ff80;
    }
`

const StyledLabel = styled.div`
    font-weight: 600;
`

const StyledSubmitButton = styled.div`
    width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    color: #fff;
    background-color: green;
    height: 34px;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
`


const SOURCE_OPTIONS = [
    { name: 'Spotlight English', value: 'Spotlight English' },
    { name: '6 minutes English ', value: '6 minutes English' },
    { name: 'Deep English', value: 'Deep English' },
    { name: 'NewsUSA', value: 'NewsUSA' }
]

const formatDate = (timeNumber: number)=>{

    console.log(formatDate);
    const time = new Date(timeNumber);
    const date = time.getDate().toString().padStart(2,'0')
    const month = (time.getMonth() + 1).toString().padStart(2,'0')
    const year = time.getFullYear()

    return `${year}-${month}-${date}`
}

const PodcastAddForm = (props: Props) => {

    const user = useUser()
    const [description, setDescription] = useState('')

    const [fileSize, setFileSize] = useState(-1)
    const [imgUrl, setImgUrl] = useState('')
    const [name, setName] = useState('')
    const [downloadLink, setDownloadLink] = useState('')
    const [date, setDate] = useState<number>(0)
    const [hint, setHint] = useState('')
    const [narrator, setNarrator] = useState<NarratorType | undefined>(undefined)
    const [source, setSource] = useState<string| undefined>(undefined)

    const [isEdit , setisEdit] = useState(false)
    const [result, setResult] = useState('')
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    let podcast: null | PodcastType = null
    if(id){
        podcast = usePodcastById(id)
    }
    useEffect(() => {
        if(podcast){
            setDescription(podcast.description.replace(/<br>/g,'\n'))
            setImgUrl(podcast.imgUrl)
            setName(podcast.name)
            setDownloadLink(podcast.downloadLink)
            setDate(podcast.postDate)
            setHint(podcast.hint ? podcast.hint :'')
            setNarrator(podcast.narrator)
            setSource(podcast.source)
            setResult(podcast.result ? podcast.result : '')
        }
    }, [podcast])
 

    useEffectOnce(() => {
        if(!id){
            setNarrator(user)
        }  
    })


    const onSubmitHandler = async (e: any) => {
        const podcastData: PodcastType = {
            source: source as string,
            fileSize : fileSize < 0 ? (podcast ? podcast.fileSize : -1): fileSize ,
            narrator: narrator as NarratorType,
            postDate: date,
            description: description.replace(new RegExp('\n', 'g'), '<br>'),
            imgUrl,
            name,
            hint,
            downloadLink,
            result
        }

        if(podcast){
            editPodcast({...podcastData, id: podcast.id})
        }else{
            addPodcast(podcastData)
        }
    }




    return (

        <StyledWrapper>

            <StyledTitle>
                <StyledBackToPodcastList onClick={()=>{
                    AppRouterContext.ref.props.history.push('/')
                }}>&larr; Back To Podcasts List</StyledBackToPodcastList>
                <span>Add Weekly Podcast</span>
                {podcast ? <StyledDeletePodcast onClick={()=>{
                    if(window.confirm('Are you sure to Delete this podcast')){
                        deletePodcast(podcast as PodcastType)
                    }
                }}>
                    <span>Delete This Podcast</span>
                </StyledDeletePodcast>:  <div style={{ marginRight: '80px' }} />}
               
            </StyledTitle>

            <StyledMainWrapper>

                <StyledSubWrapper>

                    <StyledInputControl>
                        <StyledLabel>Podcast Name</StyledLabel>
                        <StyledTextInput type='text' value={name} onChange ={e=> setName(e.target.value)}/>
                    </StyledInputControl>


                    <StyledInputControl>
                        <StyledLabel>Source</StyledLabel>
                        <SelectControl options={SOURCE_OPTIONS} haveCustomField={true}
                            value={source} onChange={(value) => setSource(value)} />
                    </StyledInputControl>

                    <StyledInputControl>
                        <StyledLabel>Author</StyledLabel>
                        <SelectUser
                            value={narrator} onChange={(value) => setNarrator(value)} />
                    </StyledInputControl>

                    <StyledInputControl>
                        <StyledLabel>Podcast Image</StyledLabel>
                        <SelectImage
                            value={imgUrl} onChange={(value) => setImgUrl(value)} />
                    </StyledInputControl>

                    <StyledInputControl>
                        <StyledLabel>Podcast File</StyledLabel>
                        <StyledTextInput type="file" onChange={(e)=>{
                                if (e.target.files) {
                                    const fileSize = e.target.files[0]
                                    setFileSize(fileSize.size)
                                }
                        }}/>
                    </StyledInputControl>

                    <StyledInputControl>
                        <StyledLabel>Podcast Download Link</StyledLabel>
                        <StyledTextInput type='text' value={downloadLink} onChange={e=> setDownloadLink(e.target.value)}/>
                    </StyledInputControl>


                    <StyledInputControl>
                        <StyledLabel>Post Date</StyledLabel>
                        <StyledTextInput type='date' value={formatDate(date)}
                        onChange={(e)=> {
                            let d = new Date(e.target.value)
                            d.setHours(22)
                            setDate(d.getTime())
                        }} />
                    </StyledInputControl>
                </StyledSubWrapper>


                <StyledSubWrapper>
                    <StyledInputControl>
                        <StyledLabel>Description</StyledLabel>
                        <StyledTextArea value={description}  onChange = {(e)=> setDescription(e.target.value)} />
                    </StyledInputControl>

                    <StyledInputControl>
                        <StyledLabel>Hint</StyledLabel>
                        <StyledTextArea value={hint}  onChange = {(e)=> setHint(e.target.value)} />
                    </StyledInputControl>

                    <StyledInputControl>
                        <StyledLabel>Result</StyledLabel>
                        <StyledTextArea value={result}  onChange = {(e)=> setResult(e.target.value)} />
                    </StyledInputControl>
                    <StyledInputControl>
                        <StyledSubmitButton onClick={onSubmitHandler}>
                            {podcast? <span>Edit Podcast</span>: <span>Add Podcast</span>}    
                        </StyledSubmitButton>

                    </StyledInputControl>
                </StyledSubWrapper>

            </StyledMainWrapper>
        </StyledWrapper>

    )
}

export default PodcastAddForm;