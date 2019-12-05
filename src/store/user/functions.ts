import store from '../store'

import * as actions from './actions'
import * as firebase from 'firebase/app'
import { User } from './types'


const CURRENT_USER_STORAGE_KEY = '@wele-user'

export const login = async ( storex = store)=>{
    const provider = new firebase.auth.FacebookAuthProvider()
    const result = await firebase.auth().signInWithPopup(provider)

    if(result.user){

        const user :User ={
            displayName: result.user.displayName,
            uid: result.user.uid,
            photoURL: result.user.photoURL,
            email: result.user.email
        } 

        await localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user))


        return storex.dispatch(actions.login(user))
    }else{
        return storex.dispatch(actions.login(null))
    }
}

export const getUser = async (storex = store)=>{
    const res = await localStorage.getItem(CURRENT_USER_STORAGE_KEY)

    if(res){
        const user: User = JSON.parse(res)
        return storex.dispatch(actions.login(user))        
    }else{
        return storex.dispatch(actions.login(null))
    }
}