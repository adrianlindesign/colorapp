var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.UserView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, "change", this.render )
	},

	tagName: 'section',
	className: 'user-view',

	events: {
		//something about rearranging
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		this.$el.empty();
		// this.$el.html(this.template( this.model.attributes ));
		console.log(this.model.get('name'))

		var entrails = ""
		entrails += "<p>" + this.model.get('name') + "</p>"
		// entrails += "<a href='" + this.model.get('app_url') + "'>"
		// entrails += 	"<h5>" + this.model.get('name') + '</h5>'
		// entrails += "</a>"

		this.$el.html(entrails)
		return this
	}

});