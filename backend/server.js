const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./Models/Todo');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo-list')
// Simple route
app.get('/', (req, res) => {
    res.send('Server is running');
});

//to display the todos
app.get('/get', (req, res) => {
    TodoModel.find()
    .then((result) => {
        console.log('Todos fetched successfully');
        res.status(200).json(result);
    })
    .catch((error) => {
        console.error('Error fetching todos:', error);
        res.status(500).json(error);
    })
});

app.post('/addtodo', (req, res) => {
    //console.log(req.body);
    const { todo } = req.body;
    console.log(`Todo received: ${todo}`);
    TodoModel.create({
        todo:todo
    })
    .then(result => {
        console.log('Todo added successfully');
        res.status(200).json(result);
    })
    .catch((error) => {
        console.error('Error adding todo:', error);
        res.status(500).json(error);
    });
});
// to update the todos
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;
    console.log(`Todo ID to update: ${id}, New Todo: ${todo}`);
    TodoModel.findByIdAndUpdate(id, { todo }, { new: true })
    .then(result => {
        if (result) {
            console.log('Todo updated successfully');
            res.status(200).json(result);
        } else {
            console.log('Todo not found');
            res.status(404).json({ message: 'Todo not found' });
        }
    })
    .catch(error => {
        console.error('Error updating todo:', error);
        res.status(500).json(error);
    });
});

//to delete the todos
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Todo ID to delete: ${id}`);
    TodoModel.findByIdAndDelete(id)
    .then(result => {
        if (result) {
            console.log('Todo deleted successfully');
            res.status(200).json({ message: 'Todo deleted successfully' });
        } else {
            console.log('Todo not found');
            res.status(404).json({ message: 'Todo not found' });
        }
    })
    .catch(error => {
        console.error('Error deleting todo:', error);
        res.status(500).json(error);
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});