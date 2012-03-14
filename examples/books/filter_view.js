//
//  FILTER  : Book
//
App.Views.Books = App.Views.Books || {};

App.Views.Books.FilterView = Backbone.View.extend({
  events : {
    "keypress input": "filter"
  },

  initialize: function() {
    this.collection.bind("reset", this.showLength, this);
    this.collection.bind("filter", this.showLength, this);
  },

  filter: function(event) {
    if (event.which == 13) {
      event.preventDefault();
      var a = this.getAttrValue(event)
      this.collection.filterAttr(a[0], a[1])
    }
  },

  showLength:function() {
    this.$(".collectionLength").text(this.collection.length)
  },

  // helper to get the attr 'film' out of name='performance[film]'
  getAttrValue: function(event) {
    var $target = $(event.currentTarget),
        query   = $target.val(),
        attr    = $target.prop("name").replace(/[a-z_].*\[([a-z].*)\]/, "$1")
    return [attr, query]
  }

});