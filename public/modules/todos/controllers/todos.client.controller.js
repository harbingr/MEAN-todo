'use strict';

angular.module('todos').controller('TodosController', ['$scope', '$location', '$state', '$stateParams', 'Todos',
    function($scope, $location, $state, $stateParams, Todos) {

        $scope.max = 4;
        $scope.sortToggle = function sortToggle (param) {
            if ($scope.sortby === param) {$scope.sortby = '-' + param;}
            else {$scope.sortby = param;}
        };

        $scope.weightrange = function(count){
            var weightratings = [];
            for (var i = 0; i < count; i++) {weightratings.push(i)}
                return weightratings;
        }

        $scope.tagsearch = function(tag){
            $scope.search = tag;
        }

        // Create new Todo
        $scope.create = function() {
            // Create new Todo object
            var todo = new Todos ({
                name: this.name,
                description: this.description,
                category: this.category,
                weight: this.weight,
                tags: this.tags.split(" ")
            });
            // Redirect after save
            todo.$save(function(response) {
                $location.path('todos/' + response._id);
                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            /*tags.$save(function(response) {
                $location.path('todos/' + response._id);
                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });*/
        };

        // Find a list of Todos
        $scope.find = function() {
            $scope.todos = Todos.query();
        };

        // Find existing Todo
        $scope.findOne = function() {
            $scope.todo = Todos.get({
                todoId: $stateParams.todoId
            });
        };

        // Update existing Todo
        $scope.update = function() {
            var todo = $scope.todo;
            todo.tags = this.tags.split(" ");
            console.log(todo);
            todo.$update(function() {
                $location.path('todos/' + todo._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

         // Remove existing Todo
        $scope.remove = function(todo) {
            if ( todo ) {
                todo.$remove();
                for (var i in $scope.todos) {
                    if ($scope.todos [i] === todo) {
                        $scope.todos.splice(i, 1);
                    }
                }
            } else {
                $scope.todo.$remove(function() {
                    $location.path('todos');
                    console.log("remove todo, client");
                });
            }
        };
        // Search for a Todo
        $scope.todoSearch = function(product) {
            $location.path('todos/' + product._id);
        };
    }
]);
