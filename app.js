var app = angular.module('libraryApp', []);

////////////
// ROUTES //
////////////

app.config(function($routeProvider, $locationProvider)  {
  $routeProvider
    .when('/', {
      template: 'Home!'
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