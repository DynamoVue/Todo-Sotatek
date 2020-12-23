import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../components/Button'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { addCheckedTodos, updateTodo } from '../redux/actions/todos.actions'

export const TodoItem = (props) => {
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all",
    });
    const dispatch = useDispatch();

    const [viewDetail, setViewDetail] = useState(false);
    const taskForm = useRef(null);

    let { todo, checkedTodos, removeTodo } = props;
    const { title, desc, date, priority, id } = todo;

    useEffect(() => {
        if (viewDetail) {
            taskForm.current.style.maxHeight = `${taskForm.current.scrollHeight + 50}px`;
        } else {
            taskForm.current.style.maxHeight = null;
        }
    }, [viewDetail]);

    const handleDetailToggle = () => {
        setViewDetail(!viewDetail);
    }

    const handleFormSubmit = (data) => {
        taskForm.current.style.maxHeight = null;
        setViewDetail(false);

        dispatch(updateTodo({
            id,
            ...data
        }));
    };

    const handleCbxChange = (e) => {
        const checked = e.target.checked;

        if (checked) {
            checkedTodos.push(todo.id);
        } else {
            checkedTodos = checkedTodos.filter(checkedTodo => checkedTodo !== todo.id);
        }

        dispatch(addCheckedTodos(checkedTodos));
    }

    return (
        <div className="task">
            <div className="task__display">
                <div className="task__display-left">
                    <input type="checkbox" className="task__completed" onChange={handleCbxChange} />
                    <h3 className="task__title">{title}</h3>
                </div>
                <div className="task__display-right">
                    <div className="task__cta">
                        <Button variant='detail' text='Detail' onClick={handleDetailToggle}/>
                        <Button variant='remove' text='Remove' onClick={() => removeTodo(id)}/>
                    </div>
                </div>
            </div>
            <form 
                ref={taskForm}
                onSubmit={handleSubmit(handleFormSubmit)} 
                className={`task-form task-form--hidden`}
            >
                <div className="task-form__block">
                    <input 
                        type="text" 
                        name="title" 
                        className="task-form__input fluid" 
                        ref={register({
                            required: "Task title is required"
                        })}
                        defaultValue={title || ''}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="title"
                        render={({ message }) => <strong className="task-form__err-mess">⚠ {message}</strong> }                      
                    />
                </div>
                <div className="task-form__block">
                    <h3 className="ternary-heading">Description</h3>
                    <textarea 
                        rows={10} 
                        className="task-form__desc fluid" 
                        ref={register()} 
                        name="desc"
                        defaultValue={desc || ''}    
                    >
                    </textarea>
                </div>
                <div className="task-form__block task-form--split">
                    <div className="left">  
                        <h3 className="ternary-heading">Due Date</h3>
                        <input 
                            type="date" 
                            name="date"
                            className="task-form__date fluid" 
                            defaultValue={date || new Date().toISOString().substr(0, 10)}
                            ref={register({
                                required: "Task Date is required",
                                validate: value => value >= new Date().toISOString().substr(0, 10) || "Task Date Can't Before Current Date"     
                            })}
                        />                  
                    </div>
                    <div className="right">
                        <h3 className="ternary-heading">Priority</h3>
                        <select className="task-form__priority fluid" name="priority" defaultValue={priority || 'normal'} ref={register()}>
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
                    <Button variant='action' text='Update' fluid/>
                </div>
            </form>
        </div>
    )
};

const optimizeTodoItem = React.memo(TodoItem);

export { optimizeTodoItem }; 
