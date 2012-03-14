//
// PAGE : Book
//
App.Views.Books = App.Views.Books || {};

App.Views.Books.PageView = Grid.PageView.extend({
  id: "bookPage",
  template: JST["templates/books/page"],
  data: {},
  events : {
    "click  .submenu a.reload" : "reloadIndex",
    "click  .submenu a.book" : "displayNew"
  },

  initialize: function() {
    this.collection = App.books; // or new App.Collections.Books;
    this.collection.fetch({data: this.data});
    this.indexView = new App.Views.Books.IndexView({collection: this.collection});
    this.newView = new App.Views.Books.NewView({collection: this.collection});
  },

  addToPage: function() {
    this.filterView = new App.Views.App.FilterView({
      collection: this.collection,
      el: this.$(".filters")
    })
  },

  noop : null
});
