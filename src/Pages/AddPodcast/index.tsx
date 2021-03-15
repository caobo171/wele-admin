import React, { useState, useEffect, useCallback } from 'react'
import * as firebase from 'firebase/app'
import { toast } from 'react-toastify'
import { useAsyncFn, useEffectOnce } from "react-use"
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
import axios from 'axios';
import { formatDate, processResult } from '@/helper/utils';
import { Form, Button, ProgressBar, Col, Spinner } from 'react-bootstrap';
interface Props {
    user: any
}

const SOURCE_OPTIONS = [
    { name: 'Spotlight English', value: 'Spotlight English' },
    { name: '6 minutes English ', value: '6 minutes English' },
    { name: 'Deep English', value: 'Deep English' },
    { name: 'NewsUSA', value: 'NewsUSA' }
]



const PodcastAddForm = (props: Props) => {

    const user = useUser()
    const [description, setDescription] = useState('')
    const [process_num, setProcess] = useState(10)
    const [file, setFile] = useState<File | null>(null)
    const [imgUrl, setImgUrl] = useState('')
    const [name, setName] = useState('')
    const [downloadLink, setDownloadLink] = useState('')
    const [date, setDate] = useState<number>(0)
    const [hint, setHint] = useState('')
    const [narrator, setNarrator] = useState<NarratorType | undefined>(undefined)
    const [source, setSource] = useState<string | undefined>(undefined);
    const [result, setResult] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const [originScript, setOriginScript] = useState('');
    let podcast: null | PodcastType = null
    if (id) {
        podcast = usePodcastById(id)
    }
    useEffect(() => {
        if (podcast) {
            setDescription(podcast.description.replace(/<br>/g, '\n'))
            setImgUrl(podcast.imgUrl)
            setName(podcast.name)
            setDownloadLink(podcast.downloadLink)
            setDate(podcast.postDate)
            setHint(podcast.hint ? podcast.hint : '')
            setNarrator(podcast.narrator)
            setSource(podcast.source)
            setResult(podcast.result ? podcast.result : '')
        }
    }, [podcast])


    useEffectOnce(() => {
        if (!id) {
            setNarrator(user)
        }
    })

    const [state, generateHint] = useAsyncFn(async () => {
        if (!file) {
            window.alert('Please enter the audio file')
            return ;
        };
        console.log('aaaaaa');


        const path = process.env.NODE_ENV !== "production" ? '' : 'https://admin-wele.herokuapp.com/';

        let isLast = false;
        let result: String[] = [];
        let time_stamps: number[] = [];
        let i = 0;
        console.log('bbbb');
        while (!isLast) {
            const formData = new FormData()
            if (file) {
                formData.append('file', file)
            }
            formData.append('transcript', originScript.replace(/-\n-/g, '- -'))
            formData.append('offset', i.toString())
            formData.append('chunk_duration', '5')
            formData.append('chunks', '10');


            const res = await axios.post(path + 'api/file',
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 60 * 60 * 1000
            });

            if (res && res.data.result) {
                setProcess(i/res.data.max_chunks * 100);
                i = i + Number(res.data.chunks)
                result = result.concat(res.data.result);
                time_stamps = time_stamps.concat(res.data.time_stamps)
                console.log(result, time_stamps);
            }

            if (res && res.data.last) {
                isLast = true
                const { hint, full } = processResult(result, time_stamps, originScript.replace(/-\n-/g, '- -'));
                setHint(hint);
                setResult(full);
                return true;
            }
            console.log('ccccc');
        }
    }, [file, originScript]);


    const onSubmitHandler = async (e: any) => {
        const podcastData: PodcastType = {
            source: source as string,
            fileSize: file ? file.size : (podcast ? podcast.fileSize : -1),
            narrator: narrator as NarratorType,
            postDate: date,
            description: description.replace(new RegExp('\n', 'g'), '<br>'),
            imgUrl,
            name,
            hint,
            downloadLink,
            result,
            // @ts-ignore
            order: Number(name.match(/\d+/)[0] as string)
        }

        if (podcast) {
            editPodcast({ ...podcastData, id: podcast.id })
        } else {
            addPodcast(podcastData)
        }
    }

    return (
        <div className="container mt-4">
            <Form.Row className="mb-4 mt-2">
                <Button className="float-left" onClick={() => {
                    AppRouterContext.ref.props.history.push('/')
                }}>&larr; Back</Button>
                {podcast ?
                    <Button className="float-right ml-4" variant="danger" onClick={() => {
                        if (window.confirm('Are you sure to Delete this podcast')) {
                            deletePodcast(podcast as PodcastType)
                        }
                    }}>
                        <span>Delete </span>
                    </Button> : <div style={{ marginRight: '80px' }} />}
            </Form.Row>

            <Form.Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Podcast Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Source</Form.Label>
                        <SelectControl options={SOURCE_OPTIONS} haveCustomField={true}
                            value={source} onChange={(value) => setSource(value)} />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group>
                        <SelectUser
                            value={narrator} onChange={(value) => setNarrator(value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Label>Podcast Image</Form.Label>
                    <SelectImage
                        value={imgUrl} onChange={(value) => setImgUrl(value)} />
                </Col>
            </Form.Row>

            <Form.Row>
            <Col>
            <Form.Group>
                <Form.Label>Podcast Download Link</Form.Label>
                <Form.Control type='text' value={downloadLink} onChange={e => setDownloadLink(e.target.value)} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Post Date</Form.Label>
                <Form.Control type='date' value={formatDate(date)}
                    onChange={(e) => {
                        let d = new Date(e.target.value)
                        d.setHours(22)
                        setDate(d.getTime())
                    }} />
            </Form.Group>
            </Col>
            </Form.Row>
            <Form.Group>
                <Form.Label>Description
                </Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Row>
            <Col>
            <Form.Group>
                <Form.Label>Podcast File</Form.Label>
                <Form.File onChange={(e: any) => {
                    if (e.target.files) {
                        const file = e.target.files[0]
                        setFile(file)
                    }
                }} />
                <Button size="sm" className="float-left mt-4" onClick={generateHint}>Generate Hint</Button>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Origin Script</Form.Label>
                <Form.Control as="textarea" value={originScript} onChange={(e) => setOriginScript(e.target.value)} />
            </Form.Group>
            </Col>
            </Form.Row>
            <Form.Row>
            {
                state.loading ? (
                    <>
                    <Spinner animation="border" />
                    <Form.Text>Generating Hint and Result ..  {process_num}% </Form.Text>
                    </>
                ) : (
                    <>
                        <Col>
                        <Form.Group>
                            <Form.Label>Hint</Form.Label>
                            <Form.Control as="textarea" value={hint} onChange={(e) => setHint(e.target.value)} />
                        </Form.Group></Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Result</Form.Label>
                            <Form.Control  as="textarea" value={result} onChange={(e) => setResult(e.target.value)} />
                        </Form.Group></Col>
                    </>
                )
            }
             </Form.Row>

            <Form.Group>
                <Button variant="success" onClick={onSubmitHandler}>
                    {podcast ? <span>Edit Podcast</span> : <span>Add Podcast</span>}
                </Button>

            </Form.Group>

        </div>
    )
}

export default PodcastAddForm;