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


BooksShowController.$inject=['$http', '$routeParams'];
function BooksShowController($http, $routeParams,) {
  var vm = this;
  var bookId = $routeParams.id;
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books/'+bookId
  }).then(onBookShowSuccess, onError)


  function onBookShowSuccess(response){
    console.log('here\'s the data for book', bookId, ':', response.data);
    vm.book = response.data;
  }
  function onError(error){
    console.log('there was an error: ', error);
  }

  vm.updateBook = function(bookToUpdate) {
    console.log('updating book: ', bookToUpdate);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/' + bookToUpdate._id,
      data: {
        title : bookToUpdate.title,
        author : bookToUpdate.author,
        image : bookToUpdate.image,
        releaseDate : bookToUpdate.releaseDate
      }
    }).then(onBookUpdateSuccess, onError);

    function onBookUpdateSuccess(response){
      console.log('here\'s the UPDATED data for book', bookId, ':', response.data);
      vm.book = response.data;
    }
  };

  vm.deleteBook = function(book) {
    console.log('deleting book: ', book);
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(onBookDeleteSuccess, onError);

    function onBookDeleteSuccess(response){
      console.log('book delete response data:', response.data);
    }
  };
};
