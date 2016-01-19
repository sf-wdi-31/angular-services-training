# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Routing Lab

**Objective:** Practice routing in Angular using `ngRoute`.

In this lab, you'll be creating a simple library app to keep track of books. The goal of this lab is to practice routing in Angular by:
* Creating route-specific view templates and controllers.
* Creating RESTful `index` and `show` routes for `books`.

When a user goes to `/`, they should see a list of books (`books#index`). When a user goes to `/books/:id`, they should see a single book (`books#show`).

Your data (a list of books) lives inside `allBooks.js`. This afternoon, you'll learn how to retreive this data from an external API to perform all CRUD operations, but for now, you'll work with this sample book data.

## Getting Started

1. Fork this repo, and clone it into your `develop` folder on your local machine.
2. Change directories into `angular-routing-lab`.
3. Run `budo app.js --open --pushstate` from the Terminal to start your server and open your app in the browser.

## ngRoute

A single page app needs a way of responding to user navigation. In order to perform client-side routing, your app needs a way to capture and respond to URL changes. For example, if the user clicks on a link to `/books/1424`, you need your Angular application to know how to respond (with what template and controller to use). What you *don't* want to happen is for the request to reach the server.

1. Include `ngRoute`:
  * Add the CDN for `ngRoute` in `index.html`.
  * Add the `ng-view` directive inside Bootstrap `col-md-6` in `index.html`

2. Configure your routes:

  * In `app.js`, include the `ngRoute` module:

    ``` js
    // app.js

    var app = angular.module('libraryApp', ['ngRoute']);
    ```

  * Next, add your first route:

    ``` js
    // app.js

    app.config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          template: 'Home!'
        });
    });
    ```

3. Fire up your server:
  * If you haven't already, run `budo app.js --open --pushstate` from the Terminal (make sure you're in your application's root directory).
  * Your app should be running on `10.0.1.10:9966` (or similar), and you should see `Home!`.

4. Use a template file instead of a string:
  * Change `template: 'Home!'` to `templateUrl: 'templates/books/index.html'`
  * Refresh the page, and you should see the content of `templates/books/index.html`.

5. Set up a controller:

  * It's time to attach a template to a specific controller. Modify your route so that it looks like this:

    ``` js
    // app.js

    app.config(function($routeProvider, $locationProvider)  {
      $routeProvider
        .when('/', {
          // template: 'Home!'
          templateUrl: 'templates/books/index.html',
          controller: 'BooksIndexCtrl'
        });
    });
    ```

  * In the `BooksIndexCtrl`, there's a test variable attached to `$scope` called `booksIndexTest`. Since `templates/books/index.html` contains `{{booksIndexTest}}`, you should see the message "Connected to BooksIndexCtrl" when you refresh the page.

## Book List Challenge

Can you display a list of all the books on the books index page? Remember that your sample book data is saved to a global variable called `allBooks`.

What directive would you use to loop through the list of books?

## HTML5 Mode

Add the following code snippet in your route configuration to remove the query hash (`/#`) from the routes:

```js
// app.js

app.config(function($routeProvider, $locationProvider)  {
  $routeProvider
    ...

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
});
```

Now instead of linking to `/#/books/1424`, you can link to `/books/1424`.

## Book Show Challege

To set up a `books#show` route, you need to first build a URL for each book with the `id` parameter.

For each of your books on the `books#index` page, add a link:

```html
<!-- templates/books/index.html.erb -->

<h5><a ng-href="/books/{{book._id}}">{{book.title}}</a></h5>
```

When a user navigates to `/books/:id`, you want to display the book with the matching id. First, update the route:

```js
// app.js

app.config(function($routeProvider, $locationProvider)  {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/books/index.html',
      controller: 'BooksIndexCtrl'
    })
    .when('/books/:id', {
      templateUrl: 'templates/books/show.html',
      controller: 'BooksShowCtrl'
    });
});
```

At this point, navigate to `/books/1424` in the browser and make sure the `books#show` template and controller are working. Note that it doesn't matter that the book with an id of 1424 doesn't exist, since you haven't done anything with the book id yet!

Next, inject a new module into `BooksShowCtrl` called `$routeParams`:

```js
// app.js

app.controller('BooksShowCtrl', ['$scope', function ($scope, $routeParams) {
  var bookId = $routeParams.id;
}]);
```

Now that you have `routeParams` set up, can you use `bookId` to find the specific book in `allBooks`? How would you display only that individual book in the view?

## Stretch Challenges

1. **Styling:** Use Bootstrap to make fancy `index` and `show` pages, listing out all the book info, and showing an image for each of them (look up `the ngSrc` directive for displaying images). Here are some of the book fields you have to work with:

  ```js
  {
    _id: "569d962bdadd431100b37c9b",
    title: "Around the World in 80 Days",
    author: "Jules Verne",
    image: "https://cloud.githubusercontent.com/assets/7833470/10892118/865bee3e-8156-11e5-9634-cd7bcd3d6d4f.jpg",
    releaseDate: "January 30, 1873",
    __v: 0
  }
  ```

2. **Redirecting:** In the `BooksShowCtrl`, redirect to the homepage (`/`), if the book is not found (i.e. the route contains a book id that doesn't exist). **Hint:** Look up Angular's `$location` service.

3. **Deleting a Book:** On the `books#show` page, add a button for the user to `delete` the book. You will need:
  * An `ng-click` directive to listen for clicks on the button.
  * A function in the `BooksShowCtrl` to remove the individual book from the `allBooks` sample data.
  * A redirect to the homepage (`/`) once the book is removed.

4. **Editing a Book:** On the `books#show` page, add a button for the user to `edit` the book. You will need:
  * An `ng-click` directive to listen for clicks on the button (when the user clicks the button, an `edit` form should show).
  * An `ng-submit` event on the `edit` form.
  * A function in the `BooksShowCtrl` to update the individual book in the `allBooks` sample data.