import React from 'react'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from '../components/Button'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'

import { history } from '../helpers/history'

import { addTodo } from '../redux/actions/todos.actions'

export const NewTodo = () => {
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
    });
    const dispatch = useDispatch();

    const handleFormSubmit = (data) => {
        const todo = {
            id: uuid(),
            ...data,
            isCompleted: false
        }

        dispatch(addTodo(todo));

        history.push('/');
    };

    return (
        <div className="new-task">
            <div className="new-task__inner">
                <h2 className="secondary-heading">New Task</h2>
                <Link to="/" className="todo-list__link">Go To ToDo List</Link>
                <div className="new-task__main">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="task-form">
                        <div className="task-form__block">
                            <input 
                                type="text" 
                                name="title" 
                                className="task-form__input fluid" 
                                placeholder="Add new task..." 
                                ref={register({
                                    required: "Task title is required"
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="title"
                                render={({ message }) => <strong className="task-form__err-mess">⚠ {message}</strong> }                      
                            />
                        </div>
                        <div className="task-form__block">
                            <h3 className="ternary-heading">Description</h3>
                            <textarea rows={10} className="task-form__desc fluid" ref={register()} name="desc"></textarea>
                        </div>
                        <div className="task-form__block task-form--split">
                            <div className="left">  
                                <h3 className="ternary-heading">Due Date</h3>
                                <input 
                                    type="date" 
                                    name="date"
                                    className="task-form__date fluid" 
                                    defaultValue={new Date().toISOString().substr(0, 10)}
                                    ref={register({
                                        required: "Task Date is required",
                                        validate: value => value >= new Date().toISOString().substr(0, 10) || "Task Date Can't Before Current Date"     
                                    })}
                                />                  
                            </div>
                            <div className="right">
                                <h3 className="ternary-heading">Priority</h3>
                                <select className="task-form__priority fluid" name="priority" defaultValue='normal' ref={register()}>
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="date"
                            render={({ message }) => <strong className="task-form__err-mess">⚠ {message}</strong> }                      
                        />
                        <div className="task-form__cta">
                            <Button variant='action' text='Add' fluid />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
