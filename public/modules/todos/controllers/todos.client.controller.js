'use strict';

angular.module('todos').controller('TodosController', ['$scope', '$location', 'Todos',
    function($scope, $location, Todos) {

        // Create new Category
        $scope.create = function() {
            // Create new Category object
            var todo = new Todos ({
                name: this.name,
                description: this.description
            });

            // Redirect after save
            todo.$save(function(response) {
                $location.path('todos/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Categories
        $scope.find = function() {
            $scope.todos = Todos.query();
        };
    }
]);