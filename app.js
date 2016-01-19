var app = angular.module('libraryApp', ['ngRoute']);

////////////
// ROUTES //
////////////

app.config(function($routeProvider, $locationProvider)  {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/books/index.html',
      controller: 'BooksIndexCtrl'
    });
});

/////////////////
// CONTROLLERS //
/////////////////

app.controller('BooksIndexCtrl', ['$scope', function ($scope) {
  $scope.booksIndexTest = 'Connected to BooksIndexCtrl';
}]);

app.controller('BooksShowCtrl', ['$scope', function ($scope) {
  $scope.booksShowTest = 'Connected to BooksShowCtrl';
}]);