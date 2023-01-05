import {
    CHANGE_USER_SEARCH_TYPE,
    HIDE_LOADER,
    SHOW_LOADER,
    CHANGE_USER_TYPE,
    LOGIN_USER,
    LOGOUT_USER,
    SET_USER_DATA,
    SHOW_MESSAGE,
    HIDE_MESSAGE
} from './types'

const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
}

const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    }
}

const hideLoader = () => {
    return {
        type: HIDE_LOADER,
    }
}

const showLoader = () => {
    return {
        type: SHOW_LOADER,
    }
}

const changeUserType = (userType) => {
    return{
        type: CHANGE_USER_TYPE,
        payload: userType
    }
}

const loginUser = (userCredentials) => {
    return {
        type: LOGIN_USER,
        payload: userCredentials
    }
}

const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

const setUserData = (userData) => {
    return {
        type: SET_USER_DATA,
        payload: userData
    }
}

export default {
    hideLoader,
    showLoader,
    changeUserType,
    loginUser, 
    logoutUser,
    setUserData,
    showMessage, 
    hideMessage
}