import React from 'react'
import styled from 'styled-components'
import { PodcastType } from '@/store/podcast/types'
import { AppRouterContext } from '@/navigation/AppRouter'
import { Card, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { formatDate } from '@/helper/utils'

interface Props {
    podcast: PodcastType
}

const PodcastItem = (props: Props) => {
    return (
        <Col xs={4} className="mb-4">
            <Card style={{ height: 370 }}>
                <Card.Img style={{ height: 120, backgroundColor: '#8c8c8c' }} variant="top" src={props.podcast.imgUrl} />
                <Card.Body>
                    <Card.Title>{props.podcast.name}</Card.Title>
                    <Card.Text style={{ fontSize: 12 }}>
                        {props.podcast.description.substr(0, 100)} ...
                    </Card.Text>
                    <div className="text-right mr-2" style={{fontSize: 12, fontWeight: 600}}>
                        {Number(props.podcast.postDate) > 0
                            ? 'Created at: ' + formatDate(Number(props.podcast.postDate)) :
                            ''}</div>
                    <Button variant="primary"><Link style={{ color: '#fff' }} to={`/add?id=${props.podcast.id}`}>Edit</Link></Button>
                </Card.Body>
            </Card>
        </Col>);
}

export default PodcastItem