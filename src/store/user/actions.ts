import { action, createAction } from "typesafe-actions"
import { User } from "./types"


export const login = createAction('user/Login' , 
(user: User | null)=> (user))<User|null>()


export const getAllUsers = createAction('user/getAllUser',
(users: Map<string, User>)=>(users))<Map<string,User>>()


export const updateUserRole = createAction('user/updateRole',
(user: User)=> (user))<User>() 