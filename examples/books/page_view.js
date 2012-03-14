//
// PAGE : Book
//
Fees.Views.Books = Fees.Views.Books || {};

Fees.Views.Books.PageView = Grid.PageView.extend({
  id: "bookPage",
  template: JST["templates/books/page"],
  data: {},
  events : {
    "click  .submenu a.reload" : "reloadIndex",
    "click  .submenu a.book" : "displayNew"
  },

  initialize: function() {
    this.collection = Fees.books; // or new Fees.Collections.Books;
    this.collection.fetch({data: this.data});
    this.indexView = new Fees.Views.Books.IndexView({collection: this.collection});
    this.newView = new Fees.Views.Books.NewView({collection: this.collection});
  },

  addToPage: function() {
    this.filterView = new Fees.Views.Fees.FilterView({
      collection: this.collection,
      el: this.$(".filters")
    })
  },

  noop : null
});
