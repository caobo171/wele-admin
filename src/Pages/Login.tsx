import React, { useState } from 'react'
import PodcastType from 'models/Podcast'
import uuid from 'uuid';
import * as firebase from 'firebase/app'

import { toast } from 'react-toastify'

import { useEffectOnce } from "react-use"



interface Props  {
    onLoginUser: (user:any)=> void
}

const Login = (props: Props) => {


    const onLoginHandler = async (e: any) => {
        var provider = new firebase.auth.FacebookAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider)

        if(result.user){

            const user = {
                displayName : result.user.displayName,
                id: result.user.uid
            }

            props.onLoginUser(user)
        }
    }
    return (
        <React.Fragment>
            <div className="container">
                <div className="container">
                    <a className="btn btn-lg btn-social btn-facebook" onClick= {onLoginHandler} >
                        <i className="fa fa-facebook fa-fw"></i> Sign in with Facebook
                    </a>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Login;