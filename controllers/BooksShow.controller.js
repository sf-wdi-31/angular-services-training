angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$routeParams', '$location', 'BooksService'];
function BooksShowController($routeParams, $location, BooksService) {
  var vm = this;
  var bookId = $routeParams.id;
  // exports
  vm.book = {};  // initially empty, getBook will fill
  vm.getBook = getBook;
  vm.updateBook = updateBook;
  vm.deleteBook = deleteBook;

  // initialization
  getBook(bookId);


  function getBook(id) {
    console.log('asking service for book with id', id);
    BooksService.show(id).then(function(data) {
      console.log('controller got data', data);
      vm.book = data;
    });
  }


  // move the rest of the $http code to the service
  function updateBook(book) {
    console.log('controller updating book: ', book);
    BooksService.update(book).then(onBookUpdateSuccess, onError);

    function onBookUpdateSuccess(book){
      console.log('here\'s the UPDATED data for book', book._id, ':', book);
      vm.book = book;
      $location.path('/');
    }
    function onError() {
      console.log("error updating the book");
    }
  }

  function deleteBook(book) {
    console.log('deleting book: ', book);
    BooksService.destroy(book).then(onBookDeleteSuccess);

    function onBookDeleteSuccess(book){
      console.log('book delete got:', book);
      $location.path('/');
    }
  }
}
