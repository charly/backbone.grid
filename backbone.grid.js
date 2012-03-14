//     Backbone.grid.js 0.1.4

//     (c) 2012 Charlie Sistovaris
//     Backbone.grid may be freely distributed under the MIT license.

var Grid = {};

// ===================================================
// # PageView : fetches collections listens to newView
// ===================================================

Grid.PageView = function(options){
  Backbone.View.apply(this, [options]);
};

_.extend(Grid.PageView.prototype, Backbone.View.prototype, {

  // renders newView & indexView to concatenates them in this.el
  // so the html is ready to be displayed
  render: function() {
    $(this.el).html(this.template({length: this.collection.length}))
    $(this.newView.render().el).hide().appendTo(this.el);
    $(this.indexView.el).appendTo(this.el);
    return this;
  },

  // Display is called in the router and takes care of it all
  display: function() {
    this.render();
    $(this.el).hide();
    $("#content").append(this.el);
    this.addToPage();
    this.slide();
  },

  addToPage: function() {
    // Stub method to be overriden
  },

  slide: function() {
    $(this.el).fadeIn("fast")
  },

  // Index View
  refreshIndex : function(event) {
    var year = $(event.currentTarget).prop("value");
    this.indexView.collection.fetch({data: {year: year}})
  },

  // Reload resources with last data
  reloadIndex : function() {
    event.preventDefault();
    this.indexView.collection.default_fetch();
  },

  // New View
  displayNew : function(event){
    event.preventDefault();
    this.$(this.newView.el).slideToggle()
  }

});

Grid.PageView.extend = Backbone.View.extend;


// ==================================
// # IndexView : rendered by PageView
// ===================================

Grid.IndexView = function(options){
  this.events = {
    "click tr[class!='edit'] td, tr[class!='month'] td" : "edit",
    "mouseover tr" : "highlightStatus",
    "mouseout tr" : "downlightStatus"
  };

  Backbone.View.apply(this, [options]);

  this.childViews = [];
  this.collection.on("reset", this.render, this);
  this.collection.on("add", this.render, this);
  this.collection.on("filter", this.render, this);


  // consider using events instead of render()
  //this.collection.on("reset", this.cleanChildren, this);
  //this.collection.on("filter", this.cleanChildren, this);
};

_.extend(Grid.IndexView.prototype, Backbone.View.prototype, {

  render : function() {
    this.cleanChildren();
    var html = this.template({collection: this.collection.toJSON()});
    $(this.el).html(html)
    return this;
  },

  // creates an editView from row_id
  edit : function(event) {
    this._setModelFromRow(event);
    var row = new this.editView({model: this.model, el: this.row});
    this.addChild(row);
    row.editCell(event);
  },

  // convienence method to extract the models id from tr#id
  _setModelFromRow : function(event){
    var $cell = this.$(event.currentTarget);
    this.row  = $cell.closest("tr");
    this.row.addClass("edit");
    var model_id = this.row.attr("id").replace(/[a-z].*_/, "");
    this.model = this.collection.get(model_id);
  },

  highlightStatus: function(event) {
    $(event.currentTarget).addClass("bgyellow")
  },

  downlightStatus: function(event) {
    $(event.currentTarget).removeClass("bgyellow");
  },

  // keeps tracks of all editViews so they can get cleaned up
  addChild: function(childView) {
    this.childViews.push(childView);
  },

  cleanChildren: function() {
    _.each(this.childViews, function(child){
      child.undelegateEvents();
    });
    this.childViews = [];
  },

  donothing: function() {}
});

Grid.IndexView.extend = Backbone.View.extend;



// =====================================================
// # NewView : handles displaying formtriggers 'created'
// =====================================================

Grid.NewView = function(options) {
  this.events = {
    "submit": "createModel"
  };

  Backbone.View.apply(this, [options]);
};

_.extend(Grid.NewView.prototype, Backbone.View.prototype, {
  // renders a nice form below the header
  render: function(){
    var html = this.template();
    $(this.el).html(html);
    if(this._formHelpers) this._formHelpers();

    return this;
  },

  // creates the model from the form and adds it to collection
  createModel: function(event) {
    event.preventDefault();
    //this.$("input[type='submit']").prop("disabled", true);
    var self = this,
        attrs = this.gatherInputs(),
        model = new this.collection.model(attrs);

    this.collection.create(attrs, {wait: true});
  },

  gatherInputs: function() {
    var attrs = _.reduce(this.$("input[id],textarea,select"), function(memo, input){
      var k = $(input).prop("name").replace(/[a-z_].*\[([a-z].*)\]/, "$1")
      memo[k] = $(input).val() || $(input).text();
      return memo;
    }, {})
    return attrs;
  }
});

Grid.NewView.extend = Backbone.View.extend;


// ====================================================
// # EditView : opens an input on a the dblclicked cell
// ====================================================

Grid.EditView = function(options) {

  this.events = {
    "click input,textarea" : "donothing",
    "dblclick input,textarea" : "donothing",
    "click td" : "editCell",
    "keyup input,textarea" : "keyup"
  };

  Backbone.View.apply(this, [options]);
};

_.extend(Grid.EditView.prototype, Backbone.View.prototype, {

  // The meat of editView : takes care of rendering inline
  // in the cell clicked in indexView or editView
  editCell : function(event) {
    event.stopImmediatePropagation();
    this.cell = $(event.currentTarget);
    this.attribute = this.cell.attr("class");

    var inputTemplate = this._createInputTemplate();
    if(inputTemplate == false) return;
    // We only have Handlebar runtime no compiling available
    //var template = Handlebars.compile(inputTemplate);
    var compiled = _.template(inputTemplate);
    this.inputTag = compiled( this.model.toJSON() );

    // setting height & width
    var width = this._cellWidth();
    var height = this._cellHeight();
    if( $(this.inputTag).prop("type") != "checkbox" ){
      this.inputTag = $(this.inputTag).width(width - 10);
      //this.inputTag = $(this.inputTag).height(height - 6);
    }

    // renders the input tag
    this.cell.html(this.inputTag);
    $(this.inputTag).focus();

    //this._formHelpers()
    //this._orchestrasAutocomplete();

    return this;
  },

  // calculates cell width so it can be applied on the input tag
  _cellWidth : function() {
    var width  = this.cell.width();
    this.cell.width(width);
    return width;
  },

  _cellHeight : function(){
    var height = this.cell.height();
    //this.cell.height(height);
    return height
  },

  // gathers all the inputs tag of a row and sets the attributes of the model
  gatherInputs: function() {
    var attrs = _.reduce(this.$("input,textarea,select"), function(memo, input){
      memo[$(input).prop("name")] = $(input).val() || $(input).text();
      return memo;
    }, {})
    return attrs;
  },

  // saves the model after gathering changes and triggers model -> 'saved'
  updateModel : function() {
    var self = this,
        attrs = this.gatherInputs();
    this.model.save(attrs, {wait: true});
  },

  // renders a clean row after an update or cancel(esc)
  renderRow : function(){
    var html = this.template(this.model.toJSON());
    $(this.el).html(html);
  },

  // wrapper to call updateModel
  keyup: function (event) {
    if (event.keyCode == 13) { // retrun
      event.preventDefault();
      event.stopImmediatePropagation();
      this.updateModel();
    } else if (event.keyCode == 27) { // escape
      event.stopImmediatePropagation();
      this.renderRow();
    }
  },

  donothing : function(event) {
    event.stopImmediatePropagation();
  },

  noop: null
});

Grid.EditView.extend = Backbone.View.extend;

