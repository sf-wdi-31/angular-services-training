angular.module('libraryApp')
  .service('BookService', BookService);

BookService.$inject = ['$http', '$q'];
function BookService($http, $q) {
  console.log('service');
  var self = this;  // similar to vm = this, but we're not working with a view-model here so using the 'generic' form for this closure
  self.book = {};  // we'll let get fill this in when it can
  self.books = [];  // we'll let getAll fill this in when it can
  self.query = query;  // get all books
  self.get = get;     // get one book
  self.update = update;  // update a book
  self.remove = remove;  // delete a book


  function query() {
    console.log('someone requested all the books');
    // create a new 'deferred'
    var def = $q.defer();
    // fire off the request
    $http({
      method: 'GET',
      url: 'https://super-crud.herokuapp.com/books'
    }).then(onBooksIndexSuccess, onError);

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise;

    // note how these functions are defined within the body of another function?
    // that gives them access to variables from that function
    // - see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBooksIndexSuccess(response){
      console.log('here\'s the get all books response data from the service', response.data);
      self.books = response.data.books;
      // ok, we got data, resolve the deferred - at this point we get to choose what we send on to the controller
      def.resolve(self.books);
    }
    function onError(error){
      console.log('there was an error: ', error);
      self.books.error = {error: error};
      // oh noes!  error - reject the deferred - at this point we get to choose what we send on to the controller
      def.reject(self.books.error);
    }
  }




  /* * * * * * * * * * * * * * * *
   *  Fetch a single book
   *
   * * * * * * * * * * * * * * * */

  function get(bookId) {
    console.log('someone requested book', bookId);
    var def = $q.defer();  // create a new 'deferred'

    $http({
      method: 'GET',
      url: 'https://super-crud.herokuapp.com/books/'+bookId
    }).then(onBookShowSuccess, onError);

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise;

    // note how these functions are defined within the body of another function?
    // that gives them access to variables from that function
    // - see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBookShowSuccess(response) {
      console.log('BookService: here\'s the data for book', bookId, ':', response.data);
      self.book = response.data;
      // ok, we got data, resolve the deferred - at this point we get to choose what we send on to the controller
      def.resolve(self.book);
    }
    function onError(error){
      console.log('there was an error: ', error);
      self.book = {error: error};
      // oh noes!  error - reject the deferred - at this point we get to choose what we send on to the controller
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

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise;


    // note how these functions are defined within the body of another function?
    // that gives them access to variables from that function
    // - see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBookUpdateSuccess(response){
      console.log('here\'s the UPDATED data for book', bookToUpdate._id, ':', response.data);
      self.book = response.data;
      // ok, we got data, resolve the deferred - at this point we get to choose what we send on to the controller
      def.resolve(self.book); // resolve the deferred and send along the book
    }

    function onError(error) {
      console.log('service reported error updating book', book);
      self.book = {error: error};
      // oh noes!  error - reject the deferred - at this point we get to choose what we send on to the controller
      def.reject(self.book);
    }
  }

  /* * * * * * * * * * * * * * * *
   *  Destroy a single book
   *
   * * * * * * * * * * * * * * * */

  function remove(book) {
    console.log('deleting book: ', book);
    var def = $q.defer();

    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(onBookDeleteSuccess, onError);

    // we return the promise here - whenever it's complete any other .then's you attach will get run too
    return def.promise; // promise sent to "my client"


    // note how these functions are defined within the body of another function?
    // that gives them access to variables from that function
    // - see lexical scope & closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    function onBookDeleteSuccess(response){
      console.log('book delete response data:', response.data, this);
      self.book = {};
      // ok, we got data, resolve the deferred - at this point we get to choose what we send on to the controller
      def.resolve({});  // for delete we'll send an empty object
    }

    function onError(error) {
      console.log('service reported error deleting book', book);
      self.book = {error: error};
      // oh noes!  error - reject the deferred - at this point we get to choose what we send on to the controller
      def.reject(self.book);
    }

  }


}
