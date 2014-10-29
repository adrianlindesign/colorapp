var templatesAppViewStartingBackGround;


var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.TemplatesAppView = Backbone.View.extend({
	initialize: function(){
		console.log("Zamooey! new templatesAppView");	
	},

	tagName: 'div',
	className: 'templates-app-hover templates-app',

	events: {
		"click" : 'changeIcon',
		"mouseenter" : 'previewIcon',
		"mouseleave" : 'unPreviewIcon'
	},

	changeIcon: function(){
		// console.log(selectedIcon);
		// console.log(selectedIconSrc);

		var cssUrl = "url(" + selectedIconSrc + ")"; //selectedIconSrc is defined in AppView
		this.$el.css({'background-image':cssUrl});
		templatesAppViewStartingBackGround = cssUrl;

		this.$el.effect( "pulsate", "fast" );
		this.$el.css({'opacity':'1'});
		
	},

	previewIcon: function(){
		templatesAppViewStartingBackGround = this.el.style.background;
		var cssUrl = "url(" + selectedIconSrc + ")";
		this.$el.css({'background-image':cssUrl});
		this.$el.toggleClass('faded');
	},

	unPreviewIcon: function(){
		this.$el.css({'background-image': templatesAppViewStartingBackGround});
		this.$el.toggleClass('faded');
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		// this.$el.html(this.template( this.model.attributes ));
		// console.log(this.model.get('name'))

		return this

	}

});