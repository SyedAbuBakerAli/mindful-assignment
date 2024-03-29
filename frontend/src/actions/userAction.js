import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

//Login
export const login = (email, password) => async (dispatch) => {
    try{

        dispatch({type: LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/mindful/login',{email,password}, config)

        dispatch({type: LOGIN_SUCCESS,
                  payload: data.user        
         })

    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


//Register user
export const register = (name, email, password) => async (dispatch) => {
    try{

        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/mindful/admin/new',{name, email, password}, config)

        dispatch({type: REGISTER_USER_SUCCESS,
                  payload: data.user        
         })

    }catch(error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout User
export const logout = () => async (dispatch) => {
    try{

        await axios.get('/mindful/logout')

        dispatch({type: LOGOUT_USER_SUCCESS      
         })

    }catch(error){
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async (dispatch) => {
    try{

        dispatch({type: LOAD_USER_REQUEST})

        const {data} = await axios.get('/mindful/admin/users')

        dispatch({type: LOAD_USER_SUCCESS,
                  payload: data.user        
         })

    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}