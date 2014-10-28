var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.UserListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'change', this.render);

		// // Display a loading indication whenever the Collection is fetching.
		// this.collection.on("fetch", function () {
	 //      // this.html("<img src='/images/spinner.gif'>");
	 //      console.log("THIS IS LOADING");
	 //    }, this);
	},
	
	tagName: 'article',
	className: 'user-list',

	render: function(){


		var self = this;
		this.$el.empty(); // clears the el so it can be repopulated
		_.each(this.collection.models, function(user){
			var userView = new Colorapp.Views.UserView({model: user})
			self.$el.append( userView.render().el );
		});
	}
})
