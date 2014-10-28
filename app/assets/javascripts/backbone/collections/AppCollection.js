var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Collections.AppCollection = Backbone.Collection.extend({
	model: Colorapp.Models.AppModel,
	url: '/apps',
	comparator: function(app){
		return -app.get('hex1_percent')
	}
});