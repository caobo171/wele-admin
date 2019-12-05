import { ActionType, createReducer, action} from 'typesafe-actions'

import * as actions from './actions'
import { State } from './types'

const initialState = {
    currentUser:  null
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
.handleAction(actions.login,(state,  action)=> ({
    currentUser: action.payload
}))
