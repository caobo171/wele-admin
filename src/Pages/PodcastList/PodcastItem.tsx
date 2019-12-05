import React from 'react'
import styled from 'styled-components'
import { PodcastType } from '@/store/podcast/types'
import { AppRouterContext } from '@/navigation/AppRouter'


const StyledWrapper = styled.div`
    width: 40%;    
    margin: 20px;

`
const StyledImage = styled.img`
    width: 100%;
    height: auto;
`

const StyledTitle = styled.div`
    font-weight: 600;
    text-align: center;
    font-size: 24px;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`
interface Props {
    podcast: PodcastType
}

const PodcastItem = (props: Props)=>{
    return <StyledWrapper>
           <StyledImage src={props.podcast.imgUrl}/>
            <StyledTitle onClick={()=>{
                AppRouterContext.ref.props.history.push(`/add?id=${props.podcast.id}`)
            }}>{props.podcast.name}</StyledTitle>
    </StyledWrapper>
}

export default PodcastItem