'use strict';

/**Module dependencies.*/
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Todo = mongoose.model('Todo'),
    //tags = mongoose.model('TodoTags'),
    _ = require('lodash');

/**Create a Todo*/
exports.create = function(req, res) {
    console.log('create todo');
    var todo = new Todo(req.body);
    //Todo.create(req.body, function(err, create) {
    todo.save(function(err) {
        console.log('err', err);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(todo);
            console.log(todo);
        }
    });
};

/**List of Todos*/
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

/**Show the current Todo*/
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

/**Update a Todo*/
exports.update = function(req, res) {
    var todo = req.todo;
    console.log(todo);
    todo = _.extend(todo, req.body);
    Todo.update({_id: req.body._id}, req.body, function(err, update) {
    //todo.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(todo);
        }
    });
};

/**Delete a Todo*/
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

/**Todo middleware*/
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