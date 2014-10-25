var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Models.AppModel = Backbone.Model.extend({
	initialize: function(){
		console.log("Boom! New AppModel created!");
	}
});