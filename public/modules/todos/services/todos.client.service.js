'use strict';

angular.module('todos').factory('Todos', ['$resource',
    function($resource) {
        return $resource('todos/:todoId', { categoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);