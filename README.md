# Backbone.Grid

Backbone.Grid is a set of [Backbone][2] View Extensions to help out build a nice Grid and a few nice things around it. It is composed of a **PageView** (the layout) an **IndexView** (the table) a **NewView** (a form) and an **EditView** (a row in the indexView) which all share a common collection to stay in sync.

## PageView
PageView holds the same role the __layout__ holds in a rails view. But it is also close to a controller since it is responsible for instantiating the main subviews - such as the NewView and the IndexView. It can be used to add a FilterView a NavigationView etc etc.

## IndexView
It is mainly responsible for displaying the __html table__ and rerendering it whenever a collection is being changed. It also is responsible for instantiating the EditView when a Row is clicked and keeping track of all those child views when they need to be clean up. (Notice : the DOM is used to figure out which model to use for EditView.)

## NewView
The NewView is a __form__ slidingDown on top of the Html table. It uses collection.create when the form is submitted to automatically refresh the IndexView when a Model is added.


## EditView
Is instantiated by a click on the __cell of the table__. The "editCell" function is usually called to do the inline editing by looking at the class attribute of the cell to determine which model attribute it is going to display and update.


## Usage (e.g EditView)

    App.Views.AModel.EditView = Grid.EditView({
      tagName : "tr",
      className : "new_matter",
      template : JST["templates/matters/show"],

      initialize : function() {
        this.model.bind("sync", this.renderRow, this);
      }
      ...
    })

To quickly build an admin like interface [check Backbonify][1] which heavily uses backbone.grid to create all it's views.

TODO : build an example site to have a better grasp of the overall concepts.

[1]: https://github.com/charly/backbonify
[2]: https://github.com/documentcloud/backbone