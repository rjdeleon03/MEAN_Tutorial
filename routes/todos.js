var express = require('express');

var router = express.Router();

var TodoController = require("../controllers/todo.controller");

// Match each API to the controller functions

// Get todos
router.get("/", TodoController.getTodos);

// New todo
router.post("/", TodoController.createTodo);

// Edit todo
router.post("/", TodoController.updateTodo);

// Delete todo
router.delete("/:id", TodoController.removeTodo);

module.exports = router;