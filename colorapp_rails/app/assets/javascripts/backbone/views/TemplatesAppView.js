var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.TemplatesAppView = Backbone.View.extend({
	initialize: function(){
		console.log("Zamooey! new templatesAppView");	
	},

	tagName: 'div',
	className: 'templates-app',

	events: {
		"dblclick" : 'changeThisIcon'
	},

	changeThisIcon: function(){
		console.log(selectedIcon);
		console.log(selectedIconSrc);

		var cssUrl = "url(" + selectedIconSrc + ")";
		this.$el.css({'background-image':cssUrl});
		this.$el.css({'background-size':"100%"});

	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		// this.$el.html(this.template( this.model.attributes ));
		// console.log(this.model.get('name'))

		this.$el.html("");
		return this

	}

});