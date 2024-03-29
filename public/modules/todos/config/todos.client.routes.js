'use strict';

//Setting up route
angular.module('todos').config(['$stateProvider',
    function($stateProvider) {
        // Todo state routing
        $stateProvider.
        state('todos', {
            url: '/todos',
            templateUrl: 'modules/todos/views/todos.client.view.html'
        }).
        state('createTodo', {
            url: '/todos/create',
            templateUrl: 'modules/todos/views/create-todo.client.view.html'
        }).
        state('viewTodo', {
            url: '/todos/:todoId',
            templateUrl: 'modules/todos/views/view-todo.client.view.html'
        }).
        state('editTodo', {
            url: '/todos/:todoId/edit',
            templateUrl: 'modules/todos/views/edit-todo.client.view.html'
        });
    }
]);