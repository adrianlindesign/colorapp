var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.TemplatesAppView = Backbone.View.extend({
	initialize: function(){
		console.log("Zamooey! new templatesAppView");	
	},

	tagName: 'div',
	className: 'templates-app',

	events: {
		
	},


	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		// this.$el.html(this.template( this.model.attributes ));
		// console.log(this.model.get('name'))

		this.$el.html("");
		return this

	}

});