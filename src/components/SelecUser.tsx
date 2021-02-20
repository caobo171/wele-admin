import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useUser } from '@/store/user/hooks'
import { User } from '@/store/user/types'
import SelectImage from './SelectImage'
import { Form } from 'react-bootstrap'


interface OptionType {
    name: string,
    value: any
}


const StyledSelect = styled.select`
    border-radius: 4px;
    border-width: 2px;
    outline: none;
    height: 40px;
    &:focus {
        border-color: #93ff80;
    }
`

const StyledTextInput = styled.input`

    border-radius: 4px;
    border-width: 0px 0px 3px 0px;
    width: 100%;
    outline: none;
    margin-bottom: 19px;
    &:focus {
        border-color: #93ff80;
    }
`

const StyledSelectUserWrapper = styled.div`
    width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`

const StyledInputControl = styled.div`
    width: 100%;
`

const StyledUserInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    margin-left: 8px;

    flex: 1;
`

const StyledAvatar = styled.img`
    border-radius: 50%;
    margin-left: 8px;
    height: 60px;
`


const StyledNarratorName = styled.div`
    margin-left: 8px;
    font-weight: 500;
`
export interface NarratorType {
    displayName: string | null,
    photoURL: string | null,
    email: string | null,
    uid?: string
}

interface Props {
    onChange: (value: NarratorType | undefined) => void,
    value: NarratorType | undefined
}


const SelectUser = React.memo((props: Props) => {
    const onChangeHandle = (e: any) => {
        let result: NarratorType = {
            ...props.value as NarratorType,
            [e.target.name]: e.target.value,
            email: ''
        };
        props.onChange(result);
    }

    return <>
        <Form.Group>
            <Form.Label>Narrator Name</Form.Label>

            <Form.Control name="displayName" value={props.value ? (props.value.displayName || '') : ''} onChange={onChangeHandle}>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Narrator Avatar</Form.Label>
            <Form.Control name="photoURL" value={props.value ? (props.value.photoURL || '') : ''} onChange={onChangeHandle}>
            </Form.Control>
            <StyledAvatar src={props.value && props.value.photoURL ? props.value.photoURL : ''} />
        </Form.Group>
    </>

}, (prev, next) => false)

const StyledGroup = styled.div`
    width: 400px;
    height: 25px;
    color: #fff;
    display: flex;
    flex-direction: row;
`

const StyledOkButton = styled.div`
    display: flex;
    flex: 1;
    background-color: green;
    text-align: center;
    border-radius: 6px;
    height: 25px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-weight: 600;
    text-transform: uppercase;
    &:hover {
        opacity: 0.7;
    }
`
const StyledCancelButton = styled.div`
    display: flex;
    flex: 1;
    background-color: red;
    text-align: center;
    border-radius: 6px;
    height: 25px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-weight: 600;
    text-transform: uppercase;
    &:hover {
        opacity: 0.7;
    }
`

const StyledWrapper = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 8px;
`

const StyledLabel = styled.div`
    margin: 0;
    width: 100%;
    margin-right: 0px;
`



const AddAuthor = (props: { onSelecHandle: (user: NarratorType | null) => void }) => {
    const [image, setImage] = useState('')

    const [text, setText] = useState('')

    const onClickHandle = () => {
        const narrator: NarratorType = {
            photoURL: image,
            displayName: text,
            email: null
        }

        props.onSelecHandle(narrator)
    }

    const onCancelHandle = () => {
        props.onSelecHandle(null)
    }
    return <StyledWrapper>
        <StyledInputControl>
            <StyledLabel>Avatar</StyledLabel>
            <SelectImage onChange={(value) => setImage(value)} value={image} />

            <StyledLabel>Name</StyledLabel>
            <StyledTextInput onChange={(e) => setText(e.target.value)} value={text} />
        </StyledInputControl>
        <StyledGroup>
            <StyledOkButton onClick={onClickHandle}>OK </StyledOkButton>
            <StyledCancelButton onClick={onCancelHandle}>Cancel</StyledCancelButton>
        </StyledGroup>



    </StyledWrapper>
}

export default SelectUser