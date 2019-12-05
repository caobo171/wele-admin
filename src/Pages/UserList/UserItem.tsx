import React from 'react'
import { User } from '@/store/user/types'
import styled from 'styled-components'
import { updateUserRole } from '@/store/user/functions'


interface Props {
    user: User
}

const StyledWrapper = styled.div`
    display: flex;
    width: 500px;
    margin-top: 20px;
    border-width: 2px;
    flex-direction: row;
    border-style: solid;
    padding: 10px;
    border-radius: 12px;
    margin-left: auto;
    margin-right: auto;
`
const StyledAvatarWrapper = styled.div`
    display: flex; 
    flex-direction: row;
    flex: 1
`
const StyledAvatar = styled.img`

    height: 40px;
    border-radius: 50%;

`

const StyledInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;

`

const StyledName = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`

const StyledEmail = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`

const StyledGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const StyledSelectRole = styled.select`
    border-radius: 4px;
    border-width: 2px;
    outline: none;
    height: 40px;
    &:focus {
        border-color: #93ff80;
    }

    cursor: pointer;
`

const UserItem = (props: Props)=>{
    const changeRoleHandle= (e:any)=>{
        if(e.target.value){
            updateUserRole({...props.user, role: e.target.value})
        }
       
    }
    return (
        <StyledWrapper>
            <StyledAvatarWrapper>
            <StyledAvatar src={props.user.photoURL as string}></StyledAvatar>
            </StyledAvatarWrapper>
            <StyledInfoWrapper>
                <StyledName>{props.user.displayName}</StyledName>
                <StyledEmail>{props.user.email}</StyledEmail>
            </StyledInfoWrapper>

            <StyledGroup>
                <StyledSelectRole onChange={changeRoleHandle} value={props.user.role}>
                    <option value={undefined}>{'Choose a role'}</option>
                    {['member','admin', 'root'].map(role=>{
                        return <option key={role} value={role}>{role}</option>
                    })}
                </StyledSelectRole>
            </StyledGroup>
        </StyledWrapper>
    )
}

export default UserItem