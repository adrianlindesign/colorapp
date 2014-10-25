var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.AppView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, "change", this.render )
	},
	tagName: 'section',
	// editTemplate: _.template( $('#penguin-edit-template').html() ),
	// template: _.template( $('#penguin-template').html() ),
	events: {
		//something about rearranging
	},
	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		this.$el.empty();
		// this.$el.html(this.template( this.model.attributes ));
		console.log(this.model.get('name'))
		this.$el.html('<h4>' + this.model.get('name') + '</h4>')
		return this
	}

});