var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.PenguinView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, "change", this.render )
	},
	tagName: 'li',
	// editTemplate: _.template( $('#penguin-edit-template').html() ),
	// template: _.template( $('#penguin-template').html() ),
	events: {
		//something about rearranging
	},
	template: _.template( $('#app-template').html() ),
	
	render: function(){
		this.$el.empty();
		this.$el.html(this.template( this.model.attributes ));

		return this
	}

});