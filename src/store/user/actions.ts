import { action, createAction } from "typesafe-actions"
import { User } from "./types"


export const login = createAction('user/Login' , 
(user: User | null)=> (user))<User|null>()
