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
    BooksService.get({id: id}, function(data) {
      console.log('controller got data', data);
      vm.book = data;
    });
  }


  function updateBook(book) {
    console.log('controller updating book: ', book);
    BooksService.update(book, onBookUpdateSuccess, onError);
    // OR
    // book.$update(onBookUpdateSuccess, onError);

    function onBookUpdateSuccess(book){
      console.log('controller got updated data for book ', book._id, ':', book);
      vm.book = book;
      $location.path('/');
    }
    function onError() {
      console.log("error updating the book");
    }
  }

  function deleteBook(book) {
    console.log('controller deleting book: ', book);
    BooksService.remove({id: book._id}, onBookDeleteSuccess);
    // OR
    // book.$delete(onBookDeleteSuccess);

    function onBookDeleteSuccess(book){
      console.log('controller book deleted:', book);
      $location.path('/');
    }
  }
}
