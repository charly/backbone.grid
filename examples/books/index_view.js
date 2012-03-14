//
// INDEX : Book
//
App.Views.Books = App.Views.Books || {};

App.Views.Books.IndexView = Grid.IndexView.extend({
  id: "books",
  template : JST["templates/books/index"],

  initialize: function(){
    this.editView = App.Views.Books.EditView;
  },

  noop: null
});