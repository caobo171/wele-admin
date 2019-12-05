import React from 'react'
import styled from 'styled-components/macro'
import { useEffectOnce } from 'react-use'
import { getUserList } from '@/store/user/functions'
import { useUserList } from '@/store/user/hooks'
import UserItem from './UserItem'


const StyledWraper = styled.div`
    width: 80%;
    margin : auto;
`

const StyledTitle = styled.h1`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 30px;
`

const UserList = ()=>{
    useEffectOnce(()=>{
        getUserList()
    })

    const users = useUserList()

    console.log('check users', users)
    return (<StyledWraper>
        <StyledTitle >List User </StyledTitle>
        {
            users.map(user=> {
                return <UserItem  key={user.id} user={user}/>
            })
        }
    </StyledWraper>
    )
}


export default UserList