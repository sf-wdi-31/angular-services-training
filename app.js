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

app.controller('BooksShowCtrl', ['$scope', '$routeParams', '$location', '$filter',
  function ($scope, $routeParams, $location, $filter) {
    var bookId = $routeParams.id;
    var foundBooks = $filter('filter')(allBooks, { _id: bookId }, true);
    if (foundBooks.length > 0) {
      $scope.book = foundBooks[0];
    } else {
      $location.path('/');
    }

    $scope.updateBook = function(updatedBook) {
      if (foundBooks.length > 0) {
        var book = foundBooks[0];
        book.title = updatedBook.title;
        book.author = updatedBook.author;
        book.image = updatedBook.image;
        book.releaseDate = updatedBook.releaseDate;
      }
      $location.path('/');
    };

    $scope.deleteBook = function(book) {
      var bookIndex = allBooks.indexOf(book);
      allBooks.splice(bookIndex, 1);
      $location.path('/');
    };
  }
]);