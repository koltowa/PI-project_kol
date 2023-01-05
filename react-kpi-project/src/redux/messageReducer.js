import {
    CREATE_NEW_MESSAGE,
    UPDATE_MESSAGE_LIST,
    SET_MESSAGE_LIST
} from "./types";

const initialState = {
    messages: []
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE_LIST:
            return { ...state, messages: action.payload };
        default:
            return state;
    }
};
