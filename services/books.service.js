angular.module('libraryApp')
  .service('BooksService', BooksService);

BooksService.$inject = ['$http', '$q'];
function BooksService($http, $q) {
  console.log('service');
  var self = this;  // similar to vm = this, but we're not working with a view-model here so using the 'generic' form for this closure
  self.book = {};  // we'll let get fill this in when it can
  self.books = [];  // we'll let getAll fill this in when it can
  self.getAll = index;
  self.show = show;
  self.update = update;
  self.destroy = destroy;



  function index() {
    console.log('someone requested all the books');

    var def = $q.defer();  // create a new 'deferred'

    $http({
      method: 'GET',
      url: 'https://super-crud.herokuapp.com/books'
    }).then(onBooksIndexSuccess, onError);

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise;

    // note how these are defined within the body of getAll?  this gives them access to variables in getAll
    // see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBooksIndexSuccess(response){
      console.log('here\'s the get all books response data from the service', response.data);
      self.books = response.data.books;
      // ok, we got data, resolve the deferred - we get to choose what we send on to the controller
      def.resolve(self.books);
    }
    function onError(error){
      console.log('there was an error: ', error);
      self.books.error = {error: error};
      // oh noes!  error - reject the deferred - we get to choose what we send on to the controller
      def.reject(self.books.error);
    }
  }




  /* * * * * * * * * * * * * * * *
   *  Fetch a single book
   *
   * * * * * * * * * * * * * * * */

  function show(bookId) {
    console.log('someone requested book', bookId);
    var def = $q.defer();  // create a new 'deferred'

    $http({
      method: 'GET',
      url: 'https://super-crud.herokuapp.com/books/'+bookId
    }).then(onBookShowSuccess, onError);

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise;

    // note how these are defined within the body of getAll?  this gives them access to variables in get
    // see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBookShowSuccess(response) {
      console.log('BooksService: here\'s the data for book', bookId, ':', response.data);
      self.book = response.data;
      def.resolve(self.book);
    }
    function onError(error){
      console.log('there was an error: ', error);
      self.book = {error: error};
      def.reject(self.book);
    }
  }

  /* * * * * * * * * * * * * * * *
   *  Update a single book
   *
   * * * * * * * * * * * * * * * */


  function update(bookToUpdate) {
    console.log('service updating book: ', bookToUpdate);
    var def = $q.defer();

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

    return def.promise;

    function onBookUpdateSuccess(response){
      console.log('here\'s the UPDATED data for book', bookToUpdate._id, ':', response.data);
      self.book = response.data;
      def.resolve(self.book); // resolve the deferred and send along the book
    }

    function onError(error) {
      console.log('service reported error updating book', book);
      self.book = {error: error};
      def.reject(self.book);
    }

  }

  /* * * * * * * * * * * * * * * *
   *  Destroy a single book
   *
   * * * * * * * * * * * * * * * */

  function destroy(book) {
    console.log('deleting book: ', book);
    var def = $q.defer();

    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(onBookDeleteSuccess, onError);

    return def.promise; // promise sent to "my client"

    function onBookDeleteSuccess(response){
      console.log('book delete response data:', response.data, this);
      self.book = {};
      def.resolve({});
    }

    function onError(error) {
      console.log('service reported error deleting book', book);
      self.book = {error: error};
      def.reject(self.book);
    }

  }


}
