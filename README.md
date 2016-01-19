# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Routing Lab

**Objective:** Practice routing in Angular using `ngRoute`.

In this lab, you'll be creating a simple library app to keep track of books. The goal of this lab is to practice routing in Angular by:
* creating route-specific view templates and controllers.
* creating RESTful `index` and `show` routes for `books`.

When a user goes to `/`, they should see a list of books (`books#index`). When a user goes to `/books/:id`, they should see a single book (`books#show`).

Your data (a list of books) lives inside `allBooks.js`. This afternoon, you'll learn how to retreive this data from an external API to perform all CRUD operations, but for now, you'll work with this sample book data.

## Getting Started

1. Fork this repo, and clone it into your `develop` folder on your local machine.
2. Change directories into `angular-routing-lab`.
3. Run `budo app.js --open` from your Terminal to start your server and open your app in the browser.

## ngRoute

A single page app needs a way of responding to user navigation. In order to perform client-side routing, your app needs a way to capture and respond to URL changes. For example, if the user clicks on a link to `/books/1414`, you need your Angular application to know how to respond (with what template and controller to use). What you *don't* want to happen is for the request to reach the server.

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
  * From your application's root directory, run `budo app.js --open` if you haven't already.
  * Your app should be open on `10.0.1.10:9966` (or similar), and you should see `Home!`.

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
          controller: 'booksIndexCtrl'
        });
    });
    ```

  * In `app.js`, there's a test variable attached to `$scope` called `booksIndexTest`. Since `templates/books/index.html` contains `{{booksIndexTest}}`, you should see the message "Connected to BooksIndexCtrl" when you refresh the page.

### book List Challenge

Can you display a list of all the books on the books index page? (Start by using the mock data object called `ALL_books` at the bottom of `app.js`).

What directive would you use to loop through a list of books?

Can you get it working using the `bookservice`, without using `ALL_books` directly?
- How would you inject the `bookservice` into `bookIndexCtrl`?
- How would you query *all* of the books?

### HTML5 Mode
Add, or uncomment, the following in your route configuration so that we don't have to use the query hash for navigation:
``` javascript
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
```

Now instead of linking to `#/books/1424` we can link to "/books/1424".

### book Show Challege
To setup a `books#show` route, we need to first figure out how to capture the id parameter in the URL.

For each of your books on the `books#index` page, let's add a link:
``` html
    <h5><a href="/books/{{book.id}}">{{book.name}}</a></h5>
```

When a user navigates to `/books/:id` we want to display the book with the matching id!

First, update the route:

``` javascript
$routeProvider
  .when('/', {
    templateUrl: 'templates/index.html',
    controller: 'booksIndexCtrl'
  })
  .when('/books/:id', { // the "id" parameter 
    templateUrl: 'templates/show.html',
    controller: 'booksShowCtrl'
  })
```

Next, we need to inject a new module into `booksShowCtrl` called `$routeParams`:

``` javascript
app.controller('booksShowCtrl', function ($scope, bookservice, $routeParams) {
    console.log($routeParams.id);
});
```

Can you get it working now that you know how to grab the corret `id`? How would you display only that individual book?

### Stretch: Prettify
Go crazy. Use Bootstrap to make a fancy index and show page, listing out all the book info, and showing an image for each of them.

Here are some of the book fields we have to work with:

``` json
{
    "id": 1429,
    "created_at": "2015-10-13T01:30:28.631Z",
    "updated_at": "2015-10-13T01:30:28.631Z",
    "name": "CHATEAU LE DOYENNE",
    "year": "2005",
    "grapes": "Merlot",
    "country": "France",
    "region": "Bordeaux",
    "price": 12,
    "description": "Though dense and chewy, this book does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
    "picture": "http://s3-us-west-2.amazonaws.com/sandboxapi/le_doyenne.jpg"
}
```
