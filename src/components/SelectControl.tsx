import React, { useState } from 'react'
import styled from 'styled-components/macro'

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

const StyledTextInput = styled.input`

    border-radius: 4px;
    border-width: 0px 0px 3px 0px;
    width: 400px;
    outline: none;

    &:focus {
        border-color: #93ff80;
    }
`




const SelectControl = (props: Props) => {
    const [Isclick, setClick] = useState(false)

    const [options, setOptions] = useState(props.options)

    const [text, setText] = useState(props.value)
    const onChangeHandle = (e: any) => {
        const value = e.target.value;
        if (value === '#' && !Isclick) {
            setClick(true)
        }else{
            props.onChange(value)
        }
    }

    const onKeyDownHandle = (e:any)=>{
        if(e.key === 'Enter' && props.options.map(e=>e.name).indexOf(text) < 0 ){
            const newOptions = [...options, {name: text, value: text}]
            setOptions(newOptions)
            setClick(false)
            props.onChange(text)
        }
    }

    return <React.Fragment>
        {!Isclick ? <StyledSelect value={props.value} onChange ={onChangeHandle}>
            <option value={undefined}> {'Choose an option'}</option>
            {options.map(option => {
                return <option key={option.name} value={option.value}>{option.name}</option>
            })}

            {props.haveCustomField && <option value={'#'}> {'Another option ...'}</option>}


        </StyledSelect> : <StyledTextInput 
        type="text" value={text} 
        placeholder={'Type your option ...'}
        onChange ={(e)=> setText(e.target.value)} onKeyDown={onKeyDownHandle}/>}
    </React.Fragment>

}


export default SelectControl