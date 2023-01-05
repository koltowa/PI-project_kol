import {
    ADD_NEW_NOTARY,
    ADD_NEW_DEPARTMENT,
    UPDATE_NOTARY,
    UPDATE_DEPARTMENT,
    DELETE_NOTARY,
    DELETE_DEPARTMENT,
} from './types'

const addNewNotary = (data) => {
    return {
        type: ADD_NEW_NOTARY,
        payload: data
    }
} 

const addNewDepartment = (data) => {
    return {
        type: ADD_NEW_DEPARTMENT,
        payload: data
    }
}

const updateNotary = (data) => {
    return {
        type: UPDATE_NOTARY,
        payload: data
    }
}
const updateDepartment = (data) => {
    return {
        type: UPDATE_DEPARTMENT,
        payload: data
    }
}

const deleteNotary = (id) => {
    return {
        type: DELETE_NOTARY,
        payload: id
    }
}

const deleteDepartment = (id) => {
    return {
        type: DELETE_DEPARTMENT,
        payload: id
    }
}

export default {
    addNewNotary,
    addNewDepartment,
    updateNotary,
    updateDepartment,
    deleteNotary,
    deleteDepartment
}