// Get the ToDo Mongoose Model
var ToDo = require("../models/todo.model");

// Save the context of this module inside _this variable
_this = this;

// Get todo list
exports.getTodos = async function(query, page, limit) {

    // Options setup for mongoose-paginate
    var options = {
        page, 
        limit
    }

    // Try-catch the awaited promise to handle the error
    try {
        var todos = await ToDo.paginate(query, options);

        // Return the todo list returned by the mongoose promise
        return todos;
    } catch (e) {
        throw Error("Error while retrieving and paginating todos.");
    }
};

// Create new todo
exports.createTodo = async function(todo) {

    // Creating a new Mongoose Object by using the new keyword
    var newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    });

    // Try-catch the saving of the new todo item
    try {
        var savedTodo = await newTodo.save();
        return savedTodo;
        
    } catch (e) {
        throw Error("Error while creating todo item.");
    }
};

// Update todo
exports.updateTodo = async function(todo) {
    var id = todo.id;

    try {
        var oldTodo = await ToDo.findById(id);
    } catch (e) {
        throw Error("Error occurred while finding the todo item.");
    }

    // Return false if no todo item was found
    if (!oldTodo) {
        return false;
    }

    console.log("Found item: " + oldTodo);
    try {
        var savedTodo = await oldTodo.save();
        return savedTodo;
    } catch (e) {
        throw Error("Error occurred while updating the todo item.");
    }
};

// Delete todo
exports.deleteTodo = async function(id) {
    try {
        var deleted = await ToDo.remove({_id: id});
        if (deleted.result.n === 0) {
            throw Error("Todo could not be deleted.");
        }
        return deleted;
    } catch (e) {
        throw Error("Error occurred while deleting the todo item.");
    }
}