var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Collections.UserCollection = Backbone.Collection.extend({
	model: Colorapp.Models.UserModel,
	url: '/users'
});