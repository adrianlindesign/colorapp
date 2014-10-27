var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.ContactSectionView = Backbone.View.extend({
	initialize: function(){
		console.log("this is our contact page");
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		// change the message
		$('#message-price').text("");
		$('#message-color').text("");
		$('#message-genre').text("");
		$('#message-view').text("");
		
		// this.$el.html(this.template( this.model.attributes ));

		var entrails = ""
		entrails += "<h1> Contact </h1>"
		entrails += "<p> To contact me, please use this crystal ball </p>"
		entrails += "<img src='http://calamitykim.typepad.com/photos/uncategorized/2007/08/22/ball.jpg' />"

		this.$el.html(entrails)
		return this
	}

});