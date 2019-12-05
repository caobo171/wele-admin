import {combineReducers} from 'redux'

import UserReducer from '@store/user/reducer'
import PodcastReducer from '@store/podcast/reducer'
const appReducer = combineReducers({
    user: UserReducer,
    podcast: PodcastReducer
})



export default appReducer;