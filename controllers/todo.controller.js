var TodoService = require('../services/todo.service');

_this = this;

// Get the todo list
exports.getTodos = async function(req, res, next) {

    // Check the existence of the query parameters
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var todos = await TodoService.getTodos({}, page, limit);
        return res.status(200).json({
            status: 200,
            data: todos,
            message: "Successfully received todos"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

// Create todo item
exports.createTodo = async function(req, res, next) {
    
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try {
        var createTodo = await TodoService.createTodo(todo);
        return res.status(201).json({
            status: 201,
            data: createdTodo,
            message: "Successfully created new todo item"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

// Update todo item
exports.updateTodo = async function(req, res, next) {

    if(!req.body._id) {
        return res.status(400).json({
            status: 400,
            message: "ID not found"
        });
    }

    var id = req.body._id;

    console.log(req.body);

    // Create new todo object with updated info
    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try {
        var updatedTodo = await TodoService.updatedTodo(todo);
        return res.status(200).json({
            status: 200,
            data: updatedTodo,
            message: "Successfully updated todo item"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

// Delete todo item
exports.removeTodo = async function(req, res, next) {
    var id = req.params.id;

    try {
        var deleted = await TodoService.deleteTodo(id);
        return res.status(204).json({
            status: 204,
            message: "Successfully deleted todo item"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}