import { todosConstants } from '../constants/todos.constants'

const initialState = {
    todos: [],
    checkedTodos: [],
    searchedTodos: []
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case todosConstants.TODO_ADD: {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload.todo
                ]
            }
        }

        case todosConstants.TODO_CHECKED: {
            return {
                ...state,
                checkedTodos: action.payload.checkedTodos
            }
        }

        case todosConstants.TODO_CHECKED_REMOVE: {
            return {
                ...state,
                checkedTodos: [],
                todos: action.payload.todos
            }
        }

        case todosConstants.TODO_REMOVE: {
            return {
                ...state,
                checkedTodos: [],
                todos: action.payload.todos
            }
        }

        case todosConstants.TODO_SEARCH: {
            const todos = [...state.todos];
            const { search } = action.payload;
            if (search) {
                const searchRegex = new RegExp(`${search.toLowerCase()}+`);

                return {
                    ...state,
                    searchedTodos: todos.filter(todo => searchRegex.test(todo.title.toLowerCase())) 
                }
            } else {
                return {
                    ...state,
                    searchedTodos: []
                }
            }
        }

        case todosConstants.TODO_UPDATE: {
            return {
                ...state,
                todos: action.payload.updatedTodos
            }
        }

        default: {
            return state;
        }
    }
} 
