angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$routeParams', '$location', 'BookService'];
function BooksShowController($routeParams, $location, BookService) {
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
    BookService.show(id).then(function(data) {
      console.log('controller got data', data);
      vm.book = data;
    });
  }


  // move the rest of the $http code to the service
  function updateBook(bookToUpdate) {
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
      $location.path('/');
    }
  }

  function deleteBook(book) {
    console.log('deleting book: ', book);
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(onBookDeleteSuccess, onError);

    function onBookDeleteSuccess(response){
      console.log('book delete response data:', response.data);
      $location.path('/');
    }
  }
}
