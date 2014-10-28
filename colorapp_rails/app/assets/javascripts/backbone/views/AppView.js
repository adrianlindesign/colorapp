var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.AppView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, "change", this.render )
	},

	tagName: 'section',
	className: 'app-view',

	events: {
		"dblclick .appView" : "identifyImageSrc"
	},

	identifyImageSrc: function(){
		var self = this;

		selectedIcon = this;
		selectedIconSrc = this.model.get('image_url');

		console.log(selectedIconSrc);
		console.log(selectedIcon);
		console.log(this.el)
		//make it pulsate or indicate you dblclicked it
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		this.$el.empty();
		// this.$el.html(this.template( this.model.attributes ));
		console.log(this.model.get('name'))

		var entrails = ""
		entrails += "<img class='appView' src='" + this.model.get('image_url') + "'/>"
		entrails += "<p>" + this.model.get('name') + "</p>"
		// entrails += "<a href='" + this.model.get('app_url') + "'>"
		// entrails += 	"<h5>" + this.model.get('name') + '</h5>'
		// entrails += "</a>"

		this.$el.html(entrails)
		return this
	}

});