import React, { useState, useEffect } from 'react'
// import PodcastType from 'models/Podcast'
// import uuid from 'uuid';
import * as firebase from 'firebase/app'

import { toast } from 'react-toastify'

import { useEffectOnce } from "react-use"
import styled from 'styled-components/macro'
import { login, getUser } from '@/store/user/functions'
import { useRouteMatch, useHistory } from 'react-router'
import { useUser } from '@/store/user/hooks'
import { AppRouterContext } from '@/navigation/AppRouter'
import brand from '@/assets/brand.jpg'
import facebookIcon from '@/assets/facebook-icon.png'

const StyledWrapper = styled.div`
    width: 60%;
    display:flex;
    margin: auto;
    flex-direction: column;
`

const StyledBrandImage = styled.img`
    height: 460px;
    width: auto;
    height: 460px;
    width: 640px;
    margin:auto;
`

const StyledFacebookLoginButton = styled.div`
    width: 405px;
    height: 60px;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #4267b2;
    border-radius: 8px;
    align-items: center;
    margin:auto;

    display: flex;
    flex-direction: row;
    cursor: pointer;
`

const StyledFacebookIcon = styled.img`
    height: 40px;
    margin-left: 10px;
`

const StyledTitle = styled.div`
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    display:flex;
    margin-right: 30px;
    flex: 4;
    color: #252525;
`

const StyledFacebookIconWrapper = styled.div`
    display:flex;
    flex: 1
`

const Login = () => {
    const user = useUser()



    useEffect(() => {
        if (user) {
            AppRouterContext.ref && AppRouterContext.ref.props.history.push('/')
        }
    }, [user])



    const onLoginHandler = () => login()

    return (

        <StyledWrapper>
            <StyledBrandImage src={brand} />
            <StyledFacebookLoginButton onClick={onLoginHandler}>
                <StyledFacebookIconWrapper>
                    <StyledFacebookIcon src={facebookIcon} />
                </StyledFacebookIconWrapper>

                <StyledTitle><span>Login With Facebook</span></StyledTitle>
            </StyledFacebookLoginButton>
        </StyledWrapper>

    )
}

export default Login;