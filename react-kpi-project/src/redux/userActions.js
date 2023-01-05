import {
    ADD_USER,
    REMOVE_USER
} from './types'


const addUser = (userData) => {
    return {
        type: ADD_USER,
        payload: userData
    }
}

const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        payload: userId
    }
}

export default {
    addUser,
    removeUser
}