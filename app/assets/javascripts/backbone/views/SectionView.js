var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.SectionView = Backbone.View.extend({
	initialize: function(){
		console.log("new sectionView generated!");
	},

	tagName: "div",

	// template: _.template( $('#app-template').html() ),
	
	render: function(entrails){
		
		// this.$el.html(this.template( this.model.attributes ));

		// change the message
		$('#message-price').text("");
		$('#message-color').text("");
		$('#message-genre').text("");
		$('#message-view').text("");
		

		this.$el.html(entrails);
		return this;
	}

});