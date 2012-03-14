//
// EDIT : Book
//
Fees.Views.Books = Fees.Views.Books || {};

Fees.Views.Books.EditView = Grid.EditView.extend({
  tagName : "tr",
  className : "new_book",
  template : JST["templates/books/show"],
  cell : null,
  attribute : null,
  inputTag : null,

  initialize : function() {
    this.model.bind("sync", this.renderRow, this);
  },


  _createInputTemplate : function() {
    if( this.cell.hasClass('address') ) {
      return "<textarea style='height:25px' name='address'>{{address}}</textarea>"
    } else {
      return '<input id="book_' + this.attribute +
        '" value="<%=' + this.attribute +
        '%>" name="' + this.attribute + '" />'
    }
  },

  noop:null
});

//_.extend(Fees.Views.Books.EditView.prototype, Fees.FormHelpers);