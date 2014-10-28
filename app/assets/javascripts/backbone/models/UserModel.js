var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Models.UserModel = Backbone.Model.extend({
	initialize: function(){
		console.log("Wham! New userModel created!");
	}
});