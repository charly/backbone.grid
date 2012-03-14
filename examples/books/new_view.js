//
// NEW : Book
//
Fees.Views.Books = Fees.Views.Books || {};

Fees.Views.Books.NewView = Grid.NewView.extend({
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

//_.extend(Fees.Views.Books.EditView.prototype, Fees.FormHelpers);