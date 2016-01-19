var app = angular.module('libraryApp', ['ngRoute']);

////////////
// ROUTES //
////////////

app.config(function($routeProvider, $locationProvider)  {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/books/index.html',
      controller: 'BooksIndexCtrl'
    })
    .when('/books/:id', {
      templateUrl: 'templates/books/show.html',
      controller: 'BooksShowCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
});

/////////////////
// CONTROLLERS //
/////////////////

app.controller('BooksIndexCtrl', ['$scope', function ($scope) {
  $scope.books = allBooks;
}]);

app.controller('BooksShowCtrl', ['$scope', function ($scope) {
  $scope.booksShowTest = 'Connected to BooksShowCtrl';
}]);