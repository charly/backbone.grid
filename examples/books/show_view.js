//
// SHOW : Book
//
Fees.Views.Books = Fees.Views.Books || {};

Fees.Views.Books.ShowView = Grid.EditView.extend({
  tagName : "tr",
  className : "new_book",
  template : JST["templates/books/show"],
  cell : null,
  attribute : null,
  inputTag : null,


  noop:null
});

//_.extend(Fees.Views.Books.EditView.prototype, Fees.FormHelpers);
