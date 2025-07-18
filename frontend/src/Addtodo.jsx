import React from 'react'
import axios from 'axios';
import './App.css';
import { TodoContext } from './context/Context.js';

function Addtodo() {
    const { setTodos, fetchTodos } = React.useContext(TodoContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [todo, setTodo] = React.useState('');
    const handleAdd=()=>{
        console.log(todo);
        if (todo === '') {
            alert('Please enter a task');
        } else {
            axios.post(`${backendUrl}/addtodo`, { todo: todo })
                .then(response => {
                    //location.reload(); // Reload the page to see the new todo
                    setTodos(prevTodos => [...prevTodos, response.data]);
                    fetchTodos();
                    console.log(response);
                    setTodo(''); // Clear the input field after adding
                })
                .catch(error => {
                    console.error('There was an error adding the todo!', error);
                });
        }
    }
    return (
    <div className='add-todo-container'>
      <input type="text" name="" id="" placeholder='Enter a task' onChange={(e)=>setTodo(e.target.value)} />
      <button className='add-btn' onClick={handleAdd}>Add</button>
    </div>
  )
}
  

export default Addtodo
