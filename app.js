angular.module('libraryApp', ['ngRoute'])
       .config(config)
       .controller('BooksIndexController', BooksIndexController)
       .controller('BooksShowController', BooksShowController)


////////////
// ROUTES //
////////////

config.$inject = ['$routeProvider', '$locationProvider'];
function config (  $routeProvider,   $locationProvider  )  {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/books/index.html',
      controller: 'BooksIndexController',
      controllerAs: 'booksIndexCtrl'
    })
    .when('/books/:id', {
      templateUrl: 'templates/books/show.html',
      controller: 'BooksShowController',
      controllerAs: 'booksShowCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
};

/////////////////
// CONTROLLERS //
/////////////////



BooksIndexController.$inject=['$http'];
function BooksIndexController($http) {
  var vm = this;
  // vm.books = allBooks;
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books'
  }).then(onBooksIndexSuccess, onError)


  function onBooksIndexSuccess(response){
    console.log('here\'s the get all books response data', response.data);
    vm.books = response.data.books;
  }
  function onError(error){
    console.log('there was an error: ', error);
  }
};


BooksShowController.$inject=['$http', '$routeParams', '$location', '$filter'];
function BooksShowController($http, $routeParams, $location, $filter) {
  var vm = this;
  var bookId = $routeParams.id;

  var foundBooks = $filter('filter')(allBooks, { _id: bookId }, true);
  if (foundBooks.length > 0) {
    this.book = foundBooks[0];
  } else {
    $location.path('/');
  }

  this.updateBook = function(updatedBook) {
    if (foundBooks.length > 0) {
      var book = foundBooks[0];
      book.title = updatedBook.title;
      book.author = updatedBook.author;
      book.image = updatedBook.image;
      book.releaseDate = updatedBook.releaseDate;
    }
    $location.path('/');
  };

  this.deleteBook = function(book) {
    var bookIndex = allBooks.indexOf(book);
    allBooks.splice(bookIndex, 1);
    $location.path('/');
  };
};
