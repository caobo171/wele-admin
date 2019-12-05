import { ActionType, createReducer, action} from 'typesafe-actions'

import * as actions from './actions'
import { State } from './types'

const initialState: State = {
    listPodcasts: new Map()
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
.handleAction(actions.addPodcast,(state,  action)=> {
    const newList = state.listPodcasts.set(action.payload.id as string,action.payload)
    return {listPodcasts: newList} 
})
.handleAction(actions.editPodcast,(state, action)=>{
    const newList = state.listPodcasts.set(action.payload.id as string,action.payload)
    return {listPodcasts: newList} 
})
.handleAction(actions.getPodcasts,(state, action)=>{
    const newList = action.payload
    return {listPodcasts: newList} 
})
