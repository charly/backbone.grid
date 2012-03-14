//
// INDEX : Book
//
Fees.Views.Books = Fees.Views.Books || {};

Fees.Views.Books.IndexView = Grid.IndexView.extend({
  id: "books",
  template : JST["templates/books/index"],

  initialize: function(){
    this.editView = Fees.Views.Books.EditView;
  },

  noop: null
});