var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };


var fullAppCollection;
var fullAppListView;

var selectedColor;
var selectedPrice = "All";


var fullUserCollection;
var fullUserListView;


var templateView;

var userId = parseInt($('#user_id').val());

Colorapp.initialize = function(){

	fullAppCollection = new Colorapp.Collections.AppCollection({
		// fetch: function(options) {
	 //        this.trigger('fetch', this, options);
	 //        return Backbone.Collection.prototype.fetch.call(this, options);
	 //    }
	});

	fullAppListView = new Colorapp.Views.AppListView({
		collection: fullAppCollection
	});
		
	// $('#main-content-area').html("<img src='/images/spinner.gif'>");

	fullUserCollection = new Colorapp.Collections.UserCollection();
	fullUserListView = new Colorapp.Views.UserListView({
		collection: fullUserCollection
	});

	setUpColorNavbar();
	setUpGenreNavbar();
	setUpSearchBar();
	setUpPriceFilter();
	setUpLinkNavBar();
	// setUpTemplateMenu();
	
	// setUpTemplateToggle();
	makeTemplateView();
	setUpTemplateViewToggle();
	setUpTemplateShowSelect();
	setUpTemplateNewButton();

	setUpSaveTemplate();
	setUpTemplateNewButton();

	fullAppCollection.fetch();
	fullUserCollection.fetch();
	setUpProfilePage();
	setUpShowAllAppOnClickTitle();

	renderAndAppendView(fullAppListView);

	$('.iPhone-6').draggable();

}



function setUpColorNavbar(){
	$('.color').on('click', function(){
		//to toggle one class
		$('.selected-genre').toggleClass('selected-genre');
		$('.selected-color').toggleClass('selected-color');
		$(this).toggleClass('selected-color');
		

		//choose color (scope is global, will be used in genre as well)
		selectedColor = this.id

		if (selectedColor == "White") {
			$('.genre').css({color: "NavajoWhite"});
		} else if (selectedColor == "Yellow") {
			$('.genre').css({color: "Gold"});
		} else {
			$('.genre').css({color: selectedColor}); // set genre color to this;		
		}

		//change the message
		$('#message-price').text("All");
		$('#message-color').text(selectedColor);
		$('#message-genre').text("");
		$('#message-view').text("apps");

		$('#message-search').animate({color: selectedColor});
		$('#message-search').animate({color: 'black'});

		var colorSortedAppsCollection = createColorCollection(selectedColor);

		var colorListView = new Colorapp.Views.AppListView({
			collection: colorSortedAppsCollection
		});
		renderAndAppendView(colorListView);
	});
}

function createColorCollection(color){
	var colorSortedArray = fullAppCollection.where({color1: color})
	var colorSortedAppsCollection = new Colorapp.Collections.AppCollection(colorSortedArray)
	return colorSortedAppsCollection
}

function setUpPriceFilter(){
	$('#message-search').on('click', function(){
		var sortedApps;
		// if color is chosen, use it, else, use generic fullAppCollection
		if (selectedColor == undefined){
			sortedApps = fullAppCollection.clone(); //do not redfine fullAppCollection, we'll need it later
		} else {
			sortedApps = createColorCollection(selectedColor);
		}

		$('.selected-genre').toggleClass('selected-genre');

		var priceSortedArray;

		if (selectedPrice == "All") {
			selectedPrice = "Free";
			priceSortedArray = sortedApps.where({free: true});

		} else if (selectedPrice == "Free") {
			selectedPrice = "Paid";
			priceSortedArray = sortedApps.where({free: false});
		} else if (selectedPrice == "Paid") {
			selectedPrice = "All";
			var a = sortedApps.where({free: false});
			var b = sortedApps.where({free: true});
			priceSortedArray = a.concat(b);
		}
		//change the message
		$('#message-price').text(selectedPrice);
		$('#message-genre').text("");
		$('#message-view').text("apps");
		$('#message-search').animate({color: selectedColor});
		$('#message-search').animate({color: 'black'});



		//generate the view
		var priceSortedAppsCollection = new Colorapp.Collections.AppCollection(priceSortedArray)

		var priceListView = new Colorapp.Views.AppListView({
			collection: priceSortedAppsCollection
		});
		renderAndAppendView(priceListView);

	});
}


function setUpGenreNavbar(){
	$('.genre').on('click', function(){

		var sortedApps;

		// if color is chosen, use it, else, use generic fullAppCollection
		if (selectedColor == undefined){
			sortedApps = fullAppCollection.clone(); //do not redfine fullAppCollection, we'll need it later
		} else {
			sortedApps = createColorCollection(selectedColor);
		}

		// show selected Genre
		$('.selected-genre').toggleClass('selected-genre');
		$(this).toggleClass('selected-genre');


		var genre = this.id

		//change the message
		$('#message-price').text("All");
		$('#message-genre').text(genre);
		$('#message-view').text("apps");
		$('#message-search').animate({color: selectedColor});
		$('#message-search').animate({color: 'black'});


		var genreSortedArray = sortedApps.where({genre: genre})

		//generate the view
		var genreSortedAppsCollection = new Colorapp.Collections.AppCollection(genreSortedArray)

		var genreListView = new Colorapp.Views.AppListView({
			collection: genreSortedAppsCollection
		});
		renderAndAppendView(genreListView);
	});
}

function capitalizeSearchedApp(searchedApp){
	//to make search case insensitive (probably can take this out of funciton later)
	var appCapsLocked = searchedApp.toUpperCase();
	var allAppNames = fullAppCollection.pluck('name');
	var allAppNamesCapsLocked = _.map(allAppNames, function(appName){
		if (appName != null) {
			return appName.toUpperCase();
		}	
	});
	var index = allAppNamesCapsLocked.indexOf(appCapsLocked);
	if ( index != -1 ) {
		return allAppNames[index]
	}
}

// search on keyup
function setUpSearchBar(){
	
	// for real-time searching
	$('#app-search-input').keyup(function(){
		var app = $(this).val(); 
		console.log(app);

		var capApp = capitalizeSearchedApp(app);

		var appResult = fullAppCollection.findWhere({name: capApp});

		var appView; // declare undefined variable

		//show search result
		if (appResult != undefined) {
			console.log("we have the app in stock!");

			appView = new Colorapp.Views.AppView({
				model: appResult
			});

			renderAndAppendView(appView);
		} 

		// show Whole collection if they backspace all the way
		if ( $('#app-search-input').val() == "" ) {
			renderAndAppendView(fullAppListView);
		}

	});

	// for enter
	$('#app-search-input').keypress(function(e){
		var app = $(this).val();

		if (e.which == 13) {
			console.log('pressed enter!');
			console.log("somebody call the API!");
		
			app = encodeURIComponent(app);

			$.post('/apps.json', {search:app}, function(result){
				
				//new appModel, add to collection
				var appModel = new Colorapp.Models.AppModel(result);
				fullAppCollection.add(appModel);

				//new view, show to user
				appView = new Colorapp.Views.AppView({
					model: appModel
				});
				renderAndAppendView(appView);
			});
			$('#app-search-input')[0].value = ""; // clear content
		} 
	});
}



// TEMPLATES ------------------------------------------------------------

function setUpTemplateViewToggle(){
	$('#template-show-button').on('click', function(){
		$('.iPhone-6').toggleClass('hide');
		console.log('boom, unhidden!');
		$('#template-name-input').toggleClass('invisible');
		
	});
}

function makeTemplateView(){
	$('.iPhone-6').html("");
	templateView = new Colorapp.Views.TemplateView({ el: $('.iPhone-6') });
	templateView.render();
	createTemplatesApps();
}

function createTemplatesApps(){
	for (var i = 0; i < 4; i++) { // four for a row
		_.each($('.templates-row'), function(row) { // create a view for this row

			var templatesAppView = new Colorapp.Views.TemplatesAppView();
			templatesAppView.render();
			$(row).append(templatesAppView.el);
		});
	}
}

function setUpTemplateNewButton(){
	$('#template-new-button').click(function(){
		makeTemplateView();
	});
}

// function setUpTemplateViewToggle(){
// 	$('#template-button').click(function(){
// 		templateView = new Colorapp.Views.TemplateView();
// 		templateView.render();
// 		$('#main-content-area').append(templateView.el);

// 		createTemplatesApps();

// 	});

// }

function setUpSaveTemplate(){
	$('#template-save-button').click(function(){
		var templateName = $('#template-name-input').val();
		var response = confirm("Save " + templateName + "?");

		if(response == true){
			var templateData = $('.iPhone-6').html();

			var thisUserId = parseInt($('#user_id').val());
			$.post('/templates', {
				screenHTML: templateData,
				device: 'iphone-6',
				user_id: thisUserId,
				template_name: $('#template-name-input').val()
			});
			var templateId = parseInt($('#template-select option:last-child').val() ) + 1;

			var entrails = '<option id="template-select-option-' + templateId + '" value="' + templateId + '">' + templateName + '</option>'
			$('#template-select').append(entrails);
		}
	});
}

// function setUpTemplateMenu(){
// 	console.log('#template-menu-show clicked')
// 	// $('#template-menu').css({class: 'hide'});
// 	$("#template-menu-show").click(function(){
// 		$('#template-menu').fadeIn('slow');

// 		// var effect = 'slide';
// 		// var options = { direction: "left"}
// 		// var duration = 500;
// 		// $('#template-menu').toggle(effect, options, duration);
// 		// $('#section_input_add').css({visibility: 'visible'});
// 		$('#template-menu').toggleClass('invisible');
// 	});
// }



function setUpTemplateShowSelect(){
	$('#template-select-button').click(function(){
		$('#template-delete-button').toggleClass('invisible');
		$("#template-name-input").toggleClass('invisible');

		var templateId = $('#template-select').val();

		$.get('/templates/' + templateId + '.json', function(item){

			$('.iPhone-6').html(item.screenHTML);
			if( $('.iPhone-6').hasClass('hide') ){
				$('.iPhone-6').toggleClass('hide');
			}
			$('.templates-app').removeClass('templates-app:hover'); // this is to stop it from previewing so that people know they can't edit

		});
		setUpTemplateDelete(templateId); //every i load a previous template, the template_id variable gets reset and sent into the setUpTemplateDelete function
		
	});
}

function setUpTemplateDelete(thisTemplateId){
	$('#template-delete-button').click(function(){
		var thisTemplate = $('#template-select-option-' + thisTemplateId);
		var response = confirm("Delete this template?");

		if (response == true ){
			$.ajax({
				url: '/templates/' + thisTemplateId,
				type: "DELETE",
				data: {id: thisTemplateId} 
			});

			$(thisTemplate).remove(); // remove from dom upon deletion. when reload, it's not rendered. good as gone.
		}	
	});
}



// --------------------------------------------------------------------------------------





function renderAndAppendView(view){
	view.render();
	$('#main-content-area').empty(); //clear it of the #loading-circle
	$('#main-content-area').append(view.el);
}


function setUpShowAllAppOnClickTitle(){
	// set up home to show all apps
	$('#title-colorappin').click(function(){
		$('.selectedColor').toggleClass('selectedColor')

		//change the message
		$('#message-price').text("All");
		$('#message-color').text("");
		$('#message-view').text("apps");
		$('#message-search').animate({color: selectedColor});
		$('#message-search').animate({color: 'black'});;


		renderAndAppendView(fullAppListView); //fullAppListView is a global
	});
}


function setUpLinkNavBar(){


	//set up About to show about
	$('#navbar-about').click(function(){
		var aboutPageView = new Colorapp.Views.SectionView();
		var entrails = "";
		entrails += "<h1>About</h1>"
		entrails += "<p>ColorApp.in is an app that lets you sort apps by color and make templates to plan out your colorful phone!</p>"; 
		entrails += "<p>Open the template, click icons, and place them on the phone template. Save templates too!";
		
		aboutPageView.render(entrails);
		$('#main-content-area').empty();
		$('#main-content-area').append(aboutPageView.el);
	});

	//set up Contact Page
	$('#navbar-contact').click(function(){

		var contactSectionView = new Colorapp.Views.ContactSectionView();
		renderAndAppendView(contactSectionView);
	});

	// $('#navbar-all-users').click(function(){

	// 	//change the message
	// 	$('#message-price').text("All");
	// 	$('#message-color').text("");
	// 	$('#message-genre').text("");
	// 	$('#message-view').text("users");

	// 	renderAndAppendView(fullUserListView);
	// });
}




function setUpProfilePage(){
	$('#profile-page').click(function(){
		var profilePage = new Colorapp.Views.SectionView({});
		var userId = $('#user_id').val();
		var entrails;
		var iPhoneDiv;

		$.get('/users/' + userId + ".json", function(user){
			entrails += '<h3>' + user.username + '</h3>';
			entrails += '<h4>' + user.email + '</h4>';

			$.get('/templates', function(templates){
				console.log(userId)
				_.each(templates, function(template){

					if(template.user_id == userId) { // make sure it's the user


						iPhoneDiv += "<div class='user-template'>";
						iPhoneDiv += 	"<h3>" + template.name + "</div>";
						iPhoneDiv +=	"<div class='iPhone-6'>"
						iPhoneDiv += 		template.screenHTML;
						iPhoneDiv +=	"</div>"
						iPhoneDiv += "</div>";
					}	
					entrails += iPhoneDiv;

				});
				profilePage.render(entrails);

				$('#main-content-area').empty();
				$('#main-content-area').append(profilePage.el);
				
			});


		});
			

		
		
	});
}








// let's get it started in here!
$(function(){
	// if( $('#main-content-area') != [] ){
		//How do i make it so it only loads on all apps? -- make it spa
		Colorapp.initialize();
	// }

});










