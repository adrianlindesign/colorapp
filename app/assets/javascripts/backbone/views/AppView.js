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
		"dblclick .appView" : "showModal",
	},

	identifyImageSrc: function(){
		//make it pulsate or indicate you dblclicked it
		this.$el.effect('bounce');
		selectedIcon = this;
		selectedIconSrc = this.model.get('image_url');
		var flashMessage = $('#flash_' + this.model.get('id'));
		flashMessage.toggleClass('invisible').delay(150).animate({'opacity': 0});
	
		// console.log(selectedIconSrc);
		// console.log(selectedIcon);
		// console.log(this.el)

	},
	showModal: function(){
		console.log('modal?');
		console.log('#modal_' + this.model.get('id'))
		console.log($('#modal_' + this.model.get('id')))
		$('#modal_' + this.model.get('id')).modal('toggle')
	},

	// template: _.template( $('#app-template').html() ),
	
	render: function(){
		console.log(this.model.get('name'));

		// this.$el.html(this.template( this.model.attributes ));
		var entrails = ""

		entrails += '<div class="flash-notice invisible" id="flash_' + this.model.get('id') +'">'
		entrails += 	'<p> Selected!</p>'
		// entrails += 	'</p> (double click to view details) </p>'
		entrails += '</div>'
		
		// entrails += '<button type="button" data-toggle="modal" data-target="#modal_'+this.model.get('id')+ '">Launch modal</button>'
		entrails += "<img title='Click to select, double-click to show more info' data-target='#modal_" + this.model.get('id') + "' class='appView' src='" + this.model.get('image_url') + "'/>"
		// entrails += "<p>" + this.model.get('name') + "</p>"
		// entrails += "<a href='" + this.model.get('app_url') + "'>"
		// entrails += 	"<p>" + this.model.get('name') + '</p>'
		// entrails += "</a>"

		entrails += '<div id="modal_' + this.model.get('id') + '" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">'
		entrails += 	'<div class="modal-dialog modal-sm">'
		entrails += 		'<div class="modal-content">'
		entrails += 			'<h4>' + this.model.get('name') + ' - <span class="modal-genre">' + this.model.get('genre') + '</span></h4>'
		entrails +=				'<img class="appView" src="' + this.model.get('image_url') +'">'
		entrails +=				'<br/>'
		entrails +=				'<p class="modal-details"> <span class="modal-title"> Primary color:</span> ' + this.model.get('hex1') + "</p>" 
		entrails += 			'<p class="modal-details"> <span class="modal-title">Percentage:</span> ' + this.model.get('hex1_percent') +'%</p>'
		entrails +=				'<br/>'
		entrails +=				'<p class="modal-details"> <span class="modal-title">Secondary color:</span> ' + this.model.get('hex2') + '</p>'
		entrails += 			'<p class="modal-details"> <span class="modal-title">Percentage:</span> ' + this.model.get('hex2_percent') +'%</p>'
		entrails +=				'<a href="' + this.model.get('app_url') + '"> Learn more & download here! </a>'  
		entrails += 		'</div>'
		entrails += 	'</div>'
		entrails += '</div>'



		this.$el.html(entrails)

		return this
	}

});