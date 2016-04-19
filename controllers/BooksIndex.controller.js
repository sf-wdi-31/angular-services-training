angular.module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject=['BookService'];
function BooksIndexController( BookService) {
  var vm = this;
  // exports
  vm.books = [];

  // initialize data
  getBooks();

  // implementations
  function getBooks() {
    BookService.query(function(data){
      console.log('here\'s the books data in the controller', data);
      vm.books = data;
    });
  }
}
