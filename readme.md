# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Services Practice

| **Objectives** |
| :---- |
| Make use of a service to extract http from the controller |
| Interact with promises |

In this lab, you'll be creating a simple library app to keep track of books.



## Research

1. Start the server (use budo or python or ruby)
1. Open your browser.  Open your javascript console. Verify which features of the site are working, which aren't.  
	* Working: [ index, show, delete ]
	* Not working: [ update ] <small style="color: red">You should see an error in the browser console</small>

1. View the BooksIndexController - observe how it uses the service instead of $http.  Take a look at BookService#query method.  See how it handles `$http` for the Controller?

## Refactor

#### Add the BookService

1. In your BooksShowController add the service as a dependency.

  > Hey!  You just fixed update! (That one was already implemented with the service for you.)


#### BooksShowController#getBook

1. Refactor the `getBook` method to **NOT** use `$http`; instead use `BookService.get(id).then`.

	> It might be helpful to look at the BooksIndexController or the updateBook method in this controller.
	> The book service returns **only** the requested book when it resolves the promise.  It handles the http stuff, so you shouldn't need to dig down into a *response* object in the controller.
	
	
1. When you're done the page should still work.  CMD+SHIFT+R

#### BookService#remove &  BooksShowController#deleteBook

1. The service has everything implemented except `remove`. Edit book.service.js - complete the remove method.

	1. Take a look at the other methods in the service.  They all follow a very similar pattern.
	2. Complete the remove method.

1. Update the controller to remove the final call to $http - use your fixed remove method in the BookService.

1. Test everything.




## ngResource

You can do the same thing with a lot less code using ngResource.  
Check out the code for the ngResource solution and compare.  


