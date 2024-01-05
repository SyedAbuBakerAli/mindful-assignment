import axios from 'axios';
import {
    ALL_USERLISTS_SUCCESS,
    ALL_USERLISTS_REQUEST,
    ALL_USERLISTS_FAIL,
    CLEAR_ERRORS,
    USERLIST_DETAILS_SUCCESS,
    USERLIST_DETAILS_REQUEST,
    USERLIST_DETAILS_FAIL
} from '../constants/userListContants'

export const usersList = () => async (dispatch) => {
    try{
       
        dispatch({type: ALL_USERLISTS_REQUEST,})

        let link = `/mindful/admin/users`

        const {data } = await axios.get(link)

        dispatch({
            type: ALL_USERLISTS_SUCCESS,
            payload: data.users
        })

    }catch(error){
        dispatch({
            type: ALL_USERLISTS_FAIL,
            payload: error.response.data.message
        })
    }
}    


//Clear Errors
export const clearErrors = () => async (dispatch) => {
dispatch({
    type: CLEAR_ERRORS
})
}


export const getProductDetails = (id) => async (dispatch) => {
    try{
       
        dispatch({type: USERLIST_DETAILS_REQUEST})

        const {data } = await axios.get(`/mindful/admin/user/${id}`)

        dispatch({
            type: USERLIST_DETAILS_SUCCESS,
            payload: data.product
        })

    }catch(error){
        dispatch({
            type: USERLIST_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
} 