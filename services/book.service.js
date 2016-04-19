angular.module('libraryApp')
  .service('BookService', BookService);

BookService.$inject = ['$http', '$q'];
function BookService($http, $q) {
  console.log('service');
  var self = this;  // similar to vm = this, but we're not working with a view-model here so using the 'generic' form for this closure
  self.book = {};  // we'll let get fill this in when it can
  self.show = show;


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
}
