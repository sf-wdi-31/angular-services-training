angular.module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject=['BooksService'];
function BooksIndexController( BooksService) {
  var vm = this;
  // exports
  vm.books = BooksService.books;

  // initialize data
  getBooks();


  // implementations
  function getBooks() {
    BooksService.getAll().then(function(data){
      console.log('here\'s the get all books response data in the controller', data);
      vm.books = data;
    });
  }
}
