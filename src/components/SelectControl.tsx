import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Form} from 'react-bootstrap';
interface OptionType {
    name: string,
    value: any
}

interface Props {
    options: Array<OptionType>,
    haveCustomField: boolean,
    onChange: (value: any) => void,
    value: any
}

const StyledSelect = styled.select`
    border-radius: 4px;
    border-width: 2px;
    width: 400px;
    outline: none;
    height: 40px;
    &:focus {
        border-color: #93ff80;
    }
`

const StyledCloseButton = styled.div`
    float: right;
    margin-top: -40px;
    cursor: pointer;
    font-weight: 600;
    font-size: 24px;
    margin-right: 16px;
    color: #9a9a9a;
`




const SelectControl = (props: Props) => {
    const [isClick, setClick] = useState(false)

    const [options, setOptions] = useState(props.options)

    const [text, setText] = useState(props.value)
    const onChangeHandle = (e: any) => {
        const value = e.target.value;
        if (value === '#' && !isClick) {
            setClick(true)
        }else{
            props.onChange(value)
        }
    }

    return <React.Fragment>
        {!isClick ? <Form.Control as="select" value={props.value} onChange ={onChangeHandle}>
            <option value={undefined}> {'Choose an option'}</option>
            {options.map(option => {
                return <option key={option.name} value={option.value}>{option.name}</option>
            })}

            {props.haveCustomField && <option value={'#'}> {'Another option ...'}</option>}


        </Form.Control> : <Form.Control 
        type="text" value={props.value}
        placeholder={'Type your option ...'}
        onChange ={onChangeHandle}/>}

        {isClick && <StyledCloseButton onClick={()=>setClick(false)}>x</StyledCloseButton>}
    </React.Fragment>

}


export default SelectControl