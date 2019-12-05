import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useUser } from '@/store/user/hooks'
import { User } from '@/store/user/types'
import SelectImage from './SelectImage'


interface OptionType {
    name: string,
    value: any
}

interface Props {
    onChange: (value: NarratorType | undefined) => void,
    value: NarratorType | undefined
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
    displayName: string | null ,
    photoURL: string | null ,
    email: string | null,
    uid?: string
}




const SelectUser = (props: Props) => {
    const [option, setOption] = useState<'me' | 'another'>('me')
    const [IsAddUser, setAddUser ] = useState(false)

    const user = useUser()
    const onChangeHandle = (e: any) => {
        setOption(e.target.value)
        if (e.target.value === 'me') {
            props.onChange(user)
        }else{
            setAddUser(true)
        }
    }

    const onSelecHandle = (user: NarratorType | null) => {
        if(user){
            props.onChange(user)
        }else{
            setOption('me')
        }
      
        setAddUser(false)
    }


    return <StyledSelectUserWrapper>
        { (option === 'another') && IsAddUser ? <AddAuthor onSelecHandle={onSelecHandle} />:
        <StyledSelect value={option} onChange={onChangeHandle}>
            <option value={undefined}> Choose an option ...</option>
            <option value={'me'}> Me</option>
            <option value={'another'}> Another</option>
        </StyledSelect>}

        <StyledUserInfo>
            <StyledAvatar src ={props.value && props.value.photoURL ? props.value.photoURL: ''}/>
            <StyledNarratorName>{props.value ? props.value.displayName:'undefined'}</StyledNarratorName>
        </StyledUserInfo>
    </StyledSelectUserWrapper>

}

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

    const onClickHandle = ()=>{
        const narrator : NarratorType = {
            photoURL: image,
            displayName: text,
            email: null
        }

        props.onSelecHandle(narrator)
    }

    const onCancelHandle = ()=>{
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