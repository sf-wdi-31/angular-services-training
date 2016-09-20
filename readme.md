# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Services Training

In this lab, you'll be creating a simple library app to keep track of books.

**Objectives**

Refactor code to move AJAX requests out of the controller.
Practice using promises.

### Investigate Existing Code

1. Start the server (use `budo -P --open`).
1. Open your browser.  Open your JavaScript console. Verify which features of the site are working and which aren't.  You should see:
	* Working: index, show, delete for books
	* Not working: update for books <small style="color: red">You should see an error in the browser console</small>  
1. Examine the `BooksIndexController` - observe that it does not use `$http`. Instead, it uses a `BookService` service.  
1. Take a look at `BookService`, especially its `query` method. Notice how it is handling `$http` requests for the controller.

### Refactor

1. Add the `BookService` service to your `BooksShowController` as a dependency.

  > Hey!  You just fixed update! (That one was already implemented with the service for you.)


#### `BooksShowController`, `getBook`

1. Refactor the `getBook` method in `BooksShowController` to **NOT** use `$http`; instead use `BookService.get(id)`, which returns a promise, and `.then`.

	> It might be helpful to look at the `BooksIndexController` or the `updateBook` method in this controller.
	> The book service returns **only** the requested book when it resolves the promise. Log the returned value to the console to see the exact format.

1. When you're done refactoring this code, the page should still work. Use CMD+SHIFT+R to refresh and clear the browser's cache.

#### `BookService`, `remove` &  `BooksShowController`, `deleteBook`

1. The book service has everything implemented except `remove`. Edit `book.service.js` to complete the `remove` method.

  Hint: Take a look at the other methods in the service.  They all follow a very similar pattern.

1. Update the books show controller to remove the final remaining call to `$http` - use your updated `remove` method from `BookService`.

1. Check that everything works.


### `ngResource`

Many sites employ RESTful conventions, so they serve things in very similar ways. What if we could reuse a service like this for any API with RESTful routes?

It turns out the Angular community thought of that a long time ago.  The module `ngResource` implements a service very similar to the one we just built! If you're using a RESTful API, you can often replace `$http` with `ngResource`.

Check the `ngResource` solution branch to compare, and/or check out this resource on `$resource`: [http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)
