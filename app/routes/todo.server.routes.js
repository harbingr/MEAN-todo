'use strict';

module.exports = function(app) {

	var todos = require('../../app/controllers/todo.server.controller');

	app.route('/todos')
		.get(todos.list)
		.post(todos.create);

	// the categoryId param is added to the params object for the request
	app.route('/todos/:todoId')
		.get(todos.read)
		.put(todos.update)
		.delete(todos.delete);
};