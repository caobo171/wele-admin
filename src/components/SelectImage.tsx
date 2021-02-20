import React, { useState } from 'react'
import styled from 'styled-components/macro'

import {Figure , Form} from 'react-bootstrap';

const StyledWrapper = styled.div`
    display: flex;
    width: 400px;
    flex-direction: row;
    margin-bottom: 8px;
`
const StyledTextInput = styled.input`

    border-radius: 4px;
    border-width: 0px 0px 3px 0px;
    width: 100%;
    outline: none;
    display:flex;
    flex: 3.2;
    margin-right: 16px;

    &:focus {
        border-color: #93ff80;
    }
`

const StyledImageWrapper = styled.div`
    height: 50px;
    display:flex;
    flex: 1;
    background-color: #595959;
`
const StyledImage = styled.img`
    height: 100%;
    width: 100%;
`
interface Props{
    value: string,
    onChange : (value: string) => void
}
const SelectImage = (props: Props)=>{
    const onChangeHandler = (e: any)=>{
        props.onChange(e.target.value)
    }
    return <>
        <Form.Control value={props.value} onChange = {onChangeHandler} placeholder='Image link'/>
        <Figure>
            <Figure.Image src={props.value}>
            </Figure.Image>
        </Figure>        
    </>
}

export default SelectImage