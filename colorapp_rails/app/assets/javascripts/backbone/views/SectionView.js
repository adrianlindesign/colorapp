var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.SectionView = Backbone.View.extend({
	initialize: function(){
		console.log("new sectionView generated!");
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(title, content){
		
		// this.$el.html(this.template( this.model.attributes ));

		// change the message
		$('#message-price').text("");
		$('#message-color').text("");
		$('#message-genre').text("");
		$('#message-view').text("");
		
		var entrails = "";
		entrails += "<h1>" + title + "</h1>";
		entrails += "<p>" + content + "</p>";
		this.$el.html(entrails);
		return this;
	}

});