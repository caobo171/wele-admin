import { useSelector } from "react-redux"

export const useUser = ()=>{
    return useSelector((state:any)=> state.user.currentUser)
}