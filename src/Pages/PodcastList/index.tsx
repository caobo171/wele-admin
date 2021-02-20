import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/macro'
import { usePodcastList } from '@/store/podcast/hooks'
import { useEffectOnce } from 'react-use'
import { getPodcasts } from '@/store/podcast/functions'
import PodcastItem from './PodcastItem'
import { AppRouterContext } from '@/navigation/AppRouter'
import { Row, Jumbotron, Button, InputGroup, FormControl } from 'react-bootstrap';


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
    const [filter, setFilter] = useState('');
    const podcasts = usePodcastList();
    const filterdPodcasts = useMemo(() => {
        if (filter === '') {
            return podcasts;
        } else {
            return podcasts.filter(e => {
                return e.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
            });
        }
    }, [podcasts, filter])
    console.log(podcasts);
    return (
        <>
            <div className="container">
                <Jumbotron className={'py-4 mt-4'}>
                    <p>
                        <span style={{fontWeight: 500, fontSize: 24}}>Filter Podcast</span>
                        <Button className="float-right" onClick={() => {
                            AppRouterContext.ref.props.history.push('/add')
                        }} variant="primary">Add Podcast</Button>
                    </p>

                    <InputGroup className="mb-3">
                        <FormControl
                            value={filter}
                            placeholder="Type podcast name..."
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </InputGroup>
                </Jumbotron>
                <Row>
                    {
                        filterdPodcasts.map(podcast => <PodcastItem key={podcast.id} podcast={podcast} />)
                    }
                </Row>
            </div>
        </>
    )
}

export default PodcastList;