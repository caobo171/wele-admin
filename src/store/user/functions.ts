import store from '../store'

import * as actions from './actions'
import * as firebase from 'firebase/app'
import { User } from './types'


const CURRENT_USER_STORAGE_KEY = '@wele-user'


const getCurrentUserAsync = (id:string) => {

    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`/users/${id}`);
      ref.once('value', async (snapshot: any) => {

        if(!snapshot || !snapshot._snapshot){
            resolve(null)
        }else{
            const user: User = {id: id , ...snapshot._snapshot.value}
            resolve(user)
        }
  
      })
    })
}
export const login = async ( storex = store)=>{
    const provider = new firebase.auth.FacebookAuthProvider()
    const result = await firebase.auth().signInWithPopup(provider)

    if(result.user){

        let user :User ={
            displayName: result.user.displayName,
            id: result.user.uid,
            photoURL: result.user.photoURL,
            email: result.user.email
        } 

        const userData : any = await getCurrentUserAsync(user.id)
        if(userData){
            await localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userData))
            return storex.dispatch(actions.login(userData))
        }else{
            await localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user))
            return storex.dispatch(actions.login(user))
        }

     
    }else{
        return storex.dispatch(actions.login(null))
    }
}

export const getUser = async (storex = store)=>{
    const res = await localStorage.getItem(CURRENT_USER_STORAGE_KEY)

    if(res){

        const user: User = JSON.parse(res)
        const userData : any = await getCurrentUserAsync(user.id)
        if(userData){
            return storex.dispatch(actions.login(userData))        
        }else{
            return storex.dispatch(actions.login(null))
        }
        
    }else{
        return storex.dispatch(actions.login(null))
    }
}


const getUsers = (): Promise<Map<string, User>> => {
    return new Promise((resolve, reject) => {
      let users = new Map<string, User>()
      const ref = firebase.database().ref(`/users`)
      ref.once('value', async (snapshots: any) => {

        window.snapshots  = snapshots
        console.log('check snapshots', snapshots)
        await snapshots.forEach((snapshot: any) => {
          const id = snapshot.key;
          const user : User = {id, ...snapshot.val()}
        //   const user: User = snapshot._snapshot.value
          users = users.set(user.id, { id: user.id, ...user })
        })
  
        resolve(users)
      })
    })
  }
  

export const getUserList = async (storex = store)=>{
    const users = await getUsers()

    return storex.dispatch(actions.getAllUsers(users))
}


export const updateUserRole = async (user: User, storex=store)=>{
    await firebase.database().ref(`/users/${user.id}`).update({
        role: user.role
    })

    return storex.dispatch(actions.updateUserRole(user))
}