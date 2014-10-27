var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var fullAppCollection;
var selectedColor;
var selectedPrice = "All";
var fullListView;



Colorapp.initialize = function(){

	fullAppCollection = new Colorapp.Collections.AppCollection({
		fetch: function(options) {
	        this.trigger('fetch', this, options);
	        return Backbone.Collection.prototype.fetch.call(this, options);
	    }
	});

	fullListView = new Colorapp.Views.AppListView({
		collection: fullAppCollection
	});
		
	// $('#main-content-area').html("<img src='/images/spinner.gif'>");

	setUpColorNavbar();
	setUpGenreNavbar();
	setUpSearchBar();
	setUpTemplateToggle();
	setUpPriceFilter();
	setUpLinkNavBar();
	

	fullAppCollection.fetch();
	
	renderAndAppendView(fullListView);


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
		$('#message-price').text(selectedPrice);
		$('#message-genre').text("");



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





function setUpTemplateToggle(){
	$('#template-button').on('click', function(){
		$('.iPhone-6').toggleClass('hide');
		console.log('boom, unhidden!');
	});
}

function renderAndAppendView(view){
	view.render();
	$('#main-content-area').empty(); //clear it of the #loading-circle
	$('#main-content-area').append(view.el);
}

function setUpLinkNavBar(){
	// set up home to show all apps
	$('#navbar-home').click(function(){
		renderAndAppendView(fullListView); //fullListView is a global
	});

	//set up about to show about
	$('#navbar-about').click(function(){

	});
}





$(function(){
	// if( $('#main-content-area') != [] ){
		//How do i make it so it only loads on all apps? -- make it spa
		Colorapp.initialize();
	// }

});










