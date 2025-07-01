import React from 'react'
import axios from 'axios';
import './App.css';

function Addtodo() {
    const [todo, setTodo] = React.useState('');
    const handleAdd=()=>{
        console.log(todo);
        if (todo === '') {
            alert('Please enter a task'); // Alert if input is empty
        } else {
            axios.post('http://localhost:5000/addtodo', { todo: todo })
                .then(response => {
                    location.reload(); // Reload the page to see the new todo
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
