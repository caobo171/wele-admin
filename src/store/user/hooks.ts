import { useSelector } from "react-redux"
import { User } from "./types"

export const useUser = (): User=>{
    return useSelector((state:any)=> state.user.currentUser)
}


export const useUserList = (): User[]=>{
    return useSelector((state:any)=> [...state.user.listUser.values()])
}