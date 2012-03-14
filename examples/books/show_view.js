//
// SHOW : Book
//
App.Views.Books = App.Views.Books || {};

App.Views.Books.ShowView = Grid.EditView.extend({
  tagName : "tr",
  className : "new_book",
  template : JST["templates/books/show"],
  cell : null,
  attribute : null,
  inputTag : null,


  noop:null
});

//_.extend(App.Views.Books.EditView.prototype, App.FormHelpers);
