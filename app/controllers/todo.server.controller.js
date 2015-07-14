'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Todo = mongoose.model('Todo'),
    _ = require('lodash');

/**
 * Create a Todo
 */
exports.create = function(req, res) {
    var todo = new Todo(req.body);

    todo.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(todo);
        }
    });
};

/**
 * Show the current Todo
 */
exports.read = function(req, res) {
    Todo.findById(req.params.todoId).exec(function(err, todo) {
        if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
         if (!todo) {
                return res.status(404).send({
                    message: 'Todo not found'
                });
            }
            res.json(todo);
      }
    });
};

/**
 * Update a Category
 */
exports.update = function(req, res) {
    var todo = req.todo;

    todo = _.extend(todo, req.body);

    todo.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(todo);
        }
    });
};

/**
 * Delete an Category
 */
exports.delete = function(req, res) {
    var todo = req.todo;

    todo.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(todo);
        }
    });
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
    Todo.find().exec(function(err, todos) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(todos);
        }
    });
};

/**
 * Todo middleware
 */
exports.todoByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Todo is invalid'
        });
    }

    Todo.findById(id).exec(function(err, todo) {
        if (err) return next(err);
        if (!todo) {
            return res.status(404).send({
                message: 'Todo not found'
            });
        }
        req.todo = todo;
        next();
    });
};