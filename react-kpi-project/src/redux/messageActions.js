import {
    CREATE_NEW_MESSAGE,
    UPDATE_MESSAGE_LIST,
    SET_MESSAGE_LIST
} from './types'


const createNewMessage = (messageData) => {
    return {
        type: CREATE_NEW_MESSAGE,
        payload: messageData
    }
}

const updateMessageList = () => {
    return {
        type: UPDATE_MESSAGE_LIST,
    }
}

const setMessageListData = (messageList) =>{
    return {
        type: SET_MESSAGE_LIST,
        payload: messageList
    }
}

export default {
    createNewMessage,
    updateMessageList,
    setMessageListData
}