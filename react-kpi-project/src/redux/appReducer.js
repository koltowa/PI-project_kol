import {
  HIDE_LOADER,
  SHOW_LOADER,
  CHANGE_USER_TYPE,
  COMMON,
  ADMINISTRATOR,
  REGISTRATOR,
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER_DATA,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from "./types";

const initialState = {
  currentPage: "",
  isLoading: false,
  currentUser: localStorage.getItem('currentUser') || COMMON,
  email: "",
  username: "",
  message: ""
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_LOADER:
      return { ...state, isLoading: false };
    case SHOW_LOADER:
      return { ...state, isLoading: true };
    case CHANGE_USER_TYPE:
      return { ...state, currentUser: action.payload };
    case LOGOUT_USER:
      return { ...state, currentUser: COMMON, email: "", username: "" };
    case SHOW_MESSAGE:
      return { ...state, message:action.payload };
    case HIDE_MESSAGE:
      return { ...state, message: ""};
    case SET_USER_DATA:
      return {
        ...state,
        email: action.payload?.email,
        username: action.payload?.username,
        currentUser: action.payload?.role === 'admin' ? ADMINISTRATOR : REGISTRATOR,
      };
    default:
      return state;
  }
};
