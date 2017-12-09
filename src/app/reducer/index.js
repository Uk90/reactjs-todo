import {combineReducer} from 'redux';
import TodoReducer from './reducer-todo.js';

const allReducers = combineReducer({
  Todo:TodoReducer
})

export default allReducers;
