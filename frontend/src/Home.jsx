import React, { useEffect } from 'react';
import Addtodo from './Addtodo.jsx';
import axios from 'axios';
import './App.css';
import { TodoContext } from './context/Context.js';

function Home() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [todos, setTodos] = React.useState([]);
    const [edit, setEdit] = React.useState(null);
    const [editValue, setEditValue] = React.useState('');

    const handleUpdate = (id) => {
        if (editValue.trim() === '') {
            alert('Please enter a task');
        } else {
            axios.put(`${backendUrl}/update/${id}`, { todo: editValue })
            .then(response => {
                console.log('Todo updated successfully:', response.data);
                //fetchTodos();
                setTodos(todos.map(todo => todo._id === id ? { ...todo, todo: editValue } : todo));
                setEdit(null);
                setEditValue('');
            })
            .catch(error => {   
                console.error('There was an error updating the todo!', error);
            });
        }
    }
    const handleDelete = (id) => () => {
        axios.delete(`${backendUrl}/delete/${id}`)
        .then(response => {
            console.log('Todo deleted successfully:', response.data);
            //fetchTodos();
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(error => {
            console.error('There was an error deleting the todo!', error);
        });
    }

    const fetchTodos = async () => {
            axios.get(`${backendUrl}/get`)
        .then(response => {
            console.log(response.data);
            setTodos(response.data || []);
        })
        .catch(error => {
            console.error('There was an error fetching the todos!', error);
        });
        }

    useEffect(() => {
        fetchTodos();
    }, [])


  return (
    <div className='main-app-wrapper'>
      <h1>To-Do List</h1>
      <TodoContext.Provider value={{ setTodos, todos, fetchTodos }}>
                <Addtodo />
            </TodoContext.Provider>
            {todos.map((todo, index) => (
                <div className='todo-item' key={todo._id}>
                    {edit === todo._id ? (
                        <>
                            <div>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                />
                            </div>
                            <div>
                                <button className='edit-btn' onClick={() => {handleUpdate(todo._id); }}>Update</button>
                                <button className='delete-btn' onClick={() => { setEdit(null); setEditValue(''); }}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div><p>{todo.todo}</p></div>
                            <div>
                                <button className='edit-btn' onClick={() => { setEdit(todo._id); setEditValue(todo.todo); }}>Edit</button>
                                <button className='delete-btn' onClick={handleDelete(todo._id)}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
    </div>
  )
}

export default Home
