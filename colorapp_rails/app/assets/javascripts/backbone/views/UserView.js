var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.UserView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, "change", this.render )
		this.listenTo( this.model, "destroy", this.render )
	},

	className: 'user-view',

	events: {
		//something about rearranging
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){

		console.log(this.model.get('username'))

		var entrails = ""
		entrails += "<h3 id='user_" + this.model.get('id') + "'>" + this.model.get('username') + "</h3>"
		this.$el.html(entrails)
		return this
	}

});