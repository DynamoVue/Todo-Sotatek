import { combineReducers } from "redux";

import { todosReducer } from './todos.reducers'

export const rootReducer = combineReducers({
    todoList: todosReducer
});
