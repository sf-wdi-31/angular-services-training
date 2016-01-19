var app = angular.module('libraryApp', []);

////////////
// ROUTES //
////////////

app.config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', {
      template: 'home'
    });

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

});

/////////////////
// CONTROLLERS //
/////////////////

app.controller('BooksIndexCtrl', ['$scope', function ($scope) {
  $scope.booksIndexTest = 'Welcome to the Books Index Page';
}]);

app.controller('BooksShowCtrl', ['$scope', function ($scope) {
  $scope.booksShowTest = 'Welcome to the Books Show Page';
}]);