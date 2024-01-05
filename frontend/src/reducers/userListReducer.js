import {
    ALL_USERLISTS_SUCCESS,
    ALL_USERLISTS_REQUEST,
    ALL_USERLISTS_FAIL,
    CLEAR_ERRORS,
    USERLIST_DETAILS_SUCCESS,
    USERLIST_DETAILS_REQUEST,
    USERLIST_DETAILS_FAIL
} from '../constants/userListContants'

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERLISTS_REQUEST:
            return {
                loading: true
            }

        case ALL_USERLISTS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case ALL_USERLISTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const userListDetailsReducer = (state = { user : {} }, action) => {
    switch (action.type) {

        case USERLIST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case USERLIST_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USERLIST_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}
