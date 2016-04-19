angular.module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject=['$http', 'BooksService'];
function BooksIndexController($http,    BooksService) {
  var vm = this;
  // exports
  vm.books = BooksService.books;
  vm.snipe = snipe;

  // initialize data
  getBooks();


  // implementations
  function getBooks() {
    BooksService.getAll().then(function(data){
      console.log('here\'s the get all books response data in the controller', data);
      vm.books = data.books;
    });
  }
  function snipe() {
    BooksService.erase();
    console.log('investigator found', BooksService.books);
  }
}
