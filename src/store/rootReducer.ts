import {combineReducers} from 'redux'

import UserReducer from '@store/user/reducer'

const appReducer = combineReducers({
    user: UserReducer,
})



export default appReducer;