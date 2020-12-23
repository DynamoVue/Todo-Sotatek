import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { TodoItem } from '../components/TodoItem'
import { Popup } from '../components/Popup'

import { removeTodos, removeTodo, searchTodos } from '../redux/actions/todos.actions'

export const TodoList = () => {
    const { todos, checkedTodos, searchedTodos } = useSelector(state => state.todoList);
    const dispatch = useDispatch();

    const handleCheckedRemove = (checkedTodos) => {
        dispatch(removeTodos(checkedTodos));
    }

    const handleTodoRemove = useCallback((removedTodoID) => {
        dispatch(removeTodo(removedTodoID));
    }, [dispatch]);

    const handleInputChange = (e) => {
        dispatch(searchTodos(e.target.value));
    }

    const renderTodoList = (todos, searchedTodos) => {
        let renderTodos = [...todos];

        if (searchedTodos.length > 0) {
            renderTodos = [...searchedTodos];
        } 
        
        return (
            renderTodos.sort((first, second) => first.date - second.date).map(todo => 
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    checkedTodos={checkedTodos} 
                    removeTodo={handleTodoRemove}
                />
            )
        )
    }

    return (
        <div className="tasks">
            <div className="tasks__inner">
                <h2 className="secondary-heading">To Do List</h2>
                <Link to="/new" className="todo-list__link">Add New To Do</Link>
                <div className="tasks__main">
                    <input 
                        type="text" 
                        name="title" 
                        className="fluid task-form__input" 
                        placeholder="Search..." 
                        onChange={handleInputChange}
                    />
                    <div className="tasks__list">
                        {
                            renderTodoList(todos, searchedTodos)
                        }
                    </div>
                </div>
                <Popup checkedTodos={checkedTodos} onRemove={handleCheckedRemove}/>
            </div>
        </div>
    )
}
