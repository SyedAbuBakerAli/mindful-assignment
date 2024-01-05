import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from '@redux-devtools/extension'
import { authReducer } from './reducers/userReducers'
import {userListReducer,userListDetailsReducer} from './reducers/userListReducer'

const reducer = combineReducers({
    usersList: userListReducer,
    userDetails: userListDetailsReducer,
    auth: authReducer
})


let initialState = {}

const middleware = [thunk];
const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;