import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import { rootReducer } from './reducers/index';

const middlewares = [thunk];

const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const initialState = {
    todoList: {
        todos,
        checkedTodos: [],
        searchedTodos: []
    }
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
