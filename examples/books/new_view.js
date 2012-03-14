//
// NEW : Book
//
App.Views.Books = App.Views.Books || {};

App.Views.Books.NewView = Grid.NewView.extend({
  id: "new_book",
  className: "new_view",
  template : JST["templates/books/new"],

  initialize: function() {
    //if(this.collection) this.collection.bind("created", this.onCreate, this)
  },

  onCreate: function() {
    //console.log("onCreate called... index re-rendered ?")
  }


});

//_.extend(App.Views.Books.EditView.prototype, App.FormHelpers);