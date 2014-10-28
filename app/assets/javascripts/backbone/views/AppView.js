var selectedIconSrc;
var selectedIcon;

var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Views.AppView = Backbone.View.extend({
	initialize: function(){
		this.listenTo( this.model, "change", this.render )
	},

	tagName: 'section',
	className: 'app-view',

	events: {
		"click .appView" : "identifyImageSrc",
		"dblclick .appView" : "showModal"
	},

	identifyImageSrc: function(){
		//make it pulsate or indicate you dblclicked it
		this.$el.effect('shake');
		selectedIcon = this;
		selectedIconSrc = this.model.get('image_url');

		// console.log(selectedIconSrc);
		// console.log(selectedIcon);
		// console.log(this.el)

	},
	showModal: function(){
		console.log('modal?');
		console.log('#modal_' + this.model.get('id'))
		console.log($('#modal_' + this.model.get('id')))
		$('#modal_' + this.model.get('id')).modal('show')
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		console.log(this.model.get('name'));

		// this.$el.html(this.template( this.model.attributes ));
		var entrails = ""
		// entrails += '<button type="button" data-toggle="modal" data-target="#modal_'+this.model.get('id')+ '">Launch modal</button>'
		entrails += "<img data-toggle='modal' data-target='#modal_" + this.model.get('id') + "' class='appView' src='" + this.model.get('image_url') + "'/>"
		entrails += "<p>" + this.model.get('name') + "</p>"
		// entrails += "<a href='" + this.model.get('app_url') + "'>"
		// entrails += 	"<h5>" + this.model.get('name') + '</h5>'
		// entrails += "</a>"

		entrails += '<div id="modal_' + this.model.get('id') + '" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">'
		entrails += 	'<div class="modal-dialog modal-sm">'
		entrails += 		'<div class="modal-content">'
		entrails += 			'TESTING'
		entrails += 		'</div>'
		entrails += 	'</div>'
		entrails += '</div>'

		this.$el.html(entrails)

		return this
	}

});