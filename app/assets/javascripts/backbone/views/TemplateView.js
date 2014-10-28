var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.TemplateView = Backbone.View.extend({
	initialize: function(){
		console.log("Zam! new templateView");	
	},

	// tagName: 'div',
	// className: 'template iPhone-6',

	events: {
		
	},


	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		// this.$el.html(this.template( this.model.attributes ));
		// console.log(this.model.get('name'))

		var entrails = "";


		entrails +=   '<div class="templates-screen">'
		entrails +=     '<div class="templates-row first-row">'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		entrails +=     '</div>'
		entrails +=     '<div class="templates-row">'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		entrails +=     '</div>'
		entrails +=     '<div class="templates-row">'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		entrails +=     '</div>'
		entrails +=     '<div class="templates-row">'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		entrails +=     '</div>'
		entrails +=     '<div class="templates-row">'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		entrails +=     '</div>'
		entrails +=     '<div class="templates-row last-row">'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		// entrails +=       '<div class="templates-app"></div>'
		entrails +=     '</div>'
		entrails +=   '</div>'




		this.$el.html(entrails)
		return this
	}

});