var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };


var fullAppCollection;
var fullAppListView;

var selectedColor;
var selectedPrice = "All";


var fullUserCollection;
var fullUserListView;



var templateView;



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
	
	// setUpTemplateToggle();
	makeTemplateView();
	setUpTemplateViewToggle();

	setUpSaveTemplate();


	fullAppCollection.fetch();
	fullUserCollection.fetch();

	renderAndAppendView(fullAppListView);


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
		
	});
}

function makeTemplateView(){
	templateView = new Colorapp.Views.TemplateView({ el: $('.template.iPhone-6') });
	templateView.render();
	createTemplatesApps();
}

function createTemplatesApps(){
	for (var i = 0; i < 4; i++) { // four for each row
		_.each($('.templates-row'), function(row) { // create a view for this row

			var templatesAppView = new Colorapp.Views.TemplatesAppView();
			templatesAppView.render();
			$(row).append(templatesAppView.el);
		});
	}
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
		var templateData = $('.iPhone-6').html();
		console.log(templateData);

		$.post('/templates', {
			screenHTML: templateData,
			device: 'iphone-6',
			user_id: parseInt( $('#user_id').val() )
		});

		// ajax post to server to create model
		// it should then show up in the dropdown menu

	});
}

// --------------------------------------------------------------------------------------





function renderAndAppendView(view){
	view.render();
	$('#main-content-area').empty(); //clear it of the #loading-circle
	$('#main-content-area').append(view.el);
}





function setUpLinkNavBar(){
	// set up home to show all apps
	$('#navbar-home').click(function(){
		$('.selectedColor').toggleClass('selectedColor')

		//change the message
		$('#message-color').text("");
		$('#message-view').text("apps");

		renderAndAppendView(fullAppListView); //fullAppListView is a global
	});

	//set up About to show about
	$('#navbar-about').click(function(){
		var aboutPageView = new Colorapp.Views.SectionView();
		aboutPageView.render("<h1>About</h1> <p>This is the about page. We write stuff about ourselves here. </p>");
		$('#main-content-area').empty();
		$('#main-content-area').append(aboutPageView.el);
	});

	//set up Contact Page
	$('#navbar-contact').click(function(){

		var contactSectionView = new Colorapp.Views.ContactSectionView();
		renderAndAppendView(contactSectionView);
	});

	$('#navbar-all-users').click(function(){

		//change the message
		$('#message-price').text("All");
		$('#message-color').text("");
		$('#message-genre').text("");
		$('#message-view').text("users");

		renderAndAppendView(fullUserListView);
	});
}




var currentUserId; // for sessions?
$(function(){
	// if( $('#main-content-area') != [] ){
		//How do i make it so it only loads on all apps? -- make it spa
		Colorapp.initialize();
	// }

});










