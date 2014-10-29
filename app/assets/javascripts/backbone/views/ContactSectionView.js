var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.ContactSectionView = Backbone.View.extend({
	initialize: function(){
		console.log("this is our contact page");
	},
	className: "info col-md-4 col-md-offset-4",

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
		entrails += "<img id='crystal-ball' src='http://calamitykim.typepad.com/photos/uncategorized/2007/08/22/ball.jpg' />"
		entrails += "<p> Alternatively, contact me at adrian.mx.lin@gmail.com"
		this.$el.html(entrails)
		return this
	}

});