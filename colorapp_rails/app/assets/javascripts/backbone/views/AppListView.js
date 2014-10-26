var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.AppListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'change', this.render);
	},
	
	tagName: 'article',
	className: 'app-list',

	render: function(){
		var self = this;
		this.$el.empty(); // clears the el so it can be repopulated
		_.each(this.collection.models, function(app){
			var appView = new Colorapp.Views.AppView({model: app})
			self.$el.append( appView.render().el );
		});
	}
})
