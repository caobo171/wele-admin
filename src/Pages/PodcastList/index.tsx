import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { usePodcastList } from '@/store/podcast/hooks'
import { useEffectOnce } from 'react-use'
import { getPodcasts } from '@/store/podcast/functions'
import PodcastItem from './PodcastItem'
import  { AppRouterContext } from '@/navigation/AppRouter'


const StyledWrapper = styled.div`
    width: 80%;
    margin: auto;


`

const StyledPodcastSession = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    height: 500px;
`

const StyledGoToAddDashboard = styled.div`
    width: 400px;
    height: 40px;
    background: green;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 20px;

    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
`

const PodcastList = () => {

    const podcasts = usePodcastList()

    return (
        <StyledWrapper>
            <StyledGoToAddDashboard onClick={()=>{
                AppRouterContext.ref.props.history.push('/add')
            }}>
                <span>Add New Podcast </span>
            </StyledGoToAddDashboard>
            <StyledPodcastSession>
                {
                    podcasts.map(podcast => <PodcastItem key={podcast.id} podcast={podcast} />)
                }
            </StyledPodcastSession>

        </StyledWrapper>
    )
}

export default PodcastList;