import { todosConstants } from '../constants/todos.constants'

export const addTodo = (todo) => {
    return (dispatch, getState) => {
        const todos = [
            ...getState().todoList.todos,
            todo
        ];

        localStorage.setItem('todos', JSON.stringify(todos));

        dispatch({
            type: todosConstants.TODO_ADD,
            payload: {
                todo
            }
        });
    }
}

export const addCheckedTodos = (checkedTodos) => {
    return {
        type: todosConstants.TODO_CHECKED,
        payload: {
            checkedTodos
        }
    }
}

export const removeTodos = (removedTodos) => {
    return (dispatch, getState) => {
        let todos = [...getState().todoList.todos];
        let todosAfterRemove = todos.filter(todo => removedTodos.indexOf(todo.id) < 0);

        localStorage.setItem('todos', JSON.stringify(todosAfterRemove));

        dispatch({
            type: todosConstants.TODO_CHECKED_REMOVE,
            payload: {
                todos: todosAfterRemove
            }
        });
    }
}

export const removeTodo = (removedTodo) => {
    return (dispatch, getState) => {
        let todos = [...getState().todoList.todos];
        let todosAfterRemove = todos.filter(todo => todo.id !== removedTodo);

        localStorage.setItem('todos', JSON.stringify(todosAfterRemove));

        dispatch({
            type: todosConstants.TODO_REMOVE,
            payload: {
                todos: todosAfterRemove
            }
        })
    }
}

export const searchTodos = (search) => {
    return {
        type: todosConstants.TODO_SEARCH,
        payload: {
            search
        }
    }
}

export const updateTodo = (updatedTodo) => {
    return (dispatch, getState) => {
        let todos = [...getState().todoList.todos];

        let updatedTodos = todos.map(todo => {
            if (todo.id === updatedTodo.id) {
                return updatedTodo;
            }

            return todo;
        });


        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        dispatch({
            type: todosConstants.TODO_UPDATE,
            payload: {
                updatedTodos
            }
        });
    }
}