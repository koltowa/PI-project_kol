import {combineReducers} from 'redux'
import {appReducer} from './appReducer'
import { searchReducer } from './searchReducer'
import { messageReducer } from './messageReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  search: searchReducer,
  message: messageReducer,
})