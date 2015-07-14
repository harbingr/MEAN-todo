'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');

	// Products Routes
	app.route('/products')
		.get(products.list)
		.post(products.create);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);
};
