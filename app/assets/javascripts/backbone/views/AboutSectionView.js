//currently unused

var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.AboutSectionView = Backbone.View.extend({
	initialize: function(){
		console.log("this is our About page");
	},
	className: "info col-md-8 col-md-offset-2",

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		// change the message
		$('#message-price').text("");
		$('#message-color').text("");
		$('#message-genre').text("");
		$('#message-view').text("");
		
		// this.$el.html(this.template( this.model.attributes ));

		var entrails = ""
		entrails += "<h2> About </h2>"
		entrails += "<p>" + aboutIntroText + "</p>"
		entrails += "<br/></p>" + aboutIntroText2 + "</p>" 
		entrails += "<br/><br/>"
		entrails += "<h2> Guide to use:</h2>"
		entrails += "<img id='instructions-image' src='" + "/assets/colorappin_instructions.png" + "'/>"
		// entrails += "<br/><br/>" 
		// entrails += "<h2> Some Programming concepts used: </h2>"
		// entrails += "<ul>"
		// entrails +=		"<li> User Authentication via user accounts and encrypted passwords </li>"
		// entrails +=		"<li> Database driven web application  </li>"
		// entrails +=		"<li> Collection sorting and filtering  </li>"
		// entrails +=		"<li> MVC frameworks and separation of concerns  </li>"
		// entrails +=		"<li> UX design to highlight affordances and structure information hierarchies </li>"
		// entrails += "</ul>"
		// entrails += "<h2> Other Resources: </h2>"
		// entrails += "<ul>"
		// entrails +=		"<li> <a href='trello.com/b/MAX2Y78d '>ColorApp.in Trello Board</a> </li>"
		// entrails +=		"<li> <a href='github.com/AdrianMLin/colorapp'>ColorApp.in Github Repo</a> </li>"
		// entrails += "</ul>"

		this.$el.html(entrails)
		return this
	}

});

var aboutIntroText = "ColorApp.in is a web application that lets users search and sort iOS apps by color, as well as genre and price, and lets them plan out how they will display them on their iPhone. This app was my final project for the August session of General Assembly's Web Development Immersive, a three month-programming bootcamp that takes people with no coding experience and equips them with the skills necessary to find a job as an entry-level web developer."
var aboutIntroText2 = "ColorApp.in was built over a six-day project sprint and was inspired by my love of color, organisation, and simple design. ColorApp.in was built on a Ruby-on-Rails framework, and uses Backbone.js to create a seamless, single-page application experience. Additional resources include: Heroku, Bootstrap, jQuery, Ajax, Underscore.js, Postgresql, as well as the ubiquitous HTML and CSS."

