var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var appCollection;
var selectedColor;
var selectedPrice = "All";



Colorapp.initialize = function(){
	appCollection = new Colorapp.Collections.AppCollection();

	var listView = new Colorapp.Views.AppListView({
		collection: appCollection
	});

	appCollection.fetch();

	$('#main-content-area').append(listView.el)

	setUpColorNavbar();
	setUpGenreNavbar();
	setUpSearchBar();
	setUpTemplateToggle();
	setUpPriceFilter();
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

		var listView = new Colorapp.Views.AppListView({
			collection: colorSortedAppsCollection
		});
		listView.render();
		$('#main-content-area').empty();
		$('#main-content-area').append(listView.el) // do i need this?
	});
}

function createColorCollection(color){
	var colorSortedArray = appCollection.where({color1: color})
	var colorSortedAppsCollection = new Colorapp.Collections.AppCollection(colorSortedArray)
	return colorSortedAppsCollection
}
function setUpPriceFilter(){
	$('#message-search').on('click', function(){
		var sortedApps;
		// if color is chosen, use it, else, use generic appCollection
		if (selectedColor == undefined){
			sortedApps = appCollection.clone(); //do not redfine appCollection, we'll need it later
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

		var listView = new Colorapp.Views.AppListView({
			collection: priceSortedAppsCollection
		});
		listView.render();
		$('#main-content-area').empty();
		$('#main-content-area').append(listView.el) // do i need this?

	});
}

function setUpGenreNavbar(){
	$('.genre').on('click', function(){

		var sortedApps;

		// if color is chosen, use it, else, use generic appCollection
		if (selectedColor == undefined){
			sortedApps = appCollection.clone(); //do not redfine appCollection, we'll need it later
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

		var listView = new Colorapp.Views.AppListView({
			collection: genreSortedAppsCollection
		});
		listView.render();
		$('#main-content-area').empty();
		$('#main-content-area').append(listView.el) // do i need this?
	});
}

function capitalizeSearchedApp(searchedApp){
	//to make search case insensitive (probably can take this out of funciton later)
	var appCapsLocked = searchedApp.toUpperCase();
	var allAppNames = appCollection.pluck('name');
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

		var appResult = appCollection.findWhere({name: capApp});

		var appView; // declare undefined variable

		//show search result
		if (appResult != undefined) {
			console.log("we have the app in stock!");

			appView = new Colorapp.Views.AppView({
				model: appResult
			});

			appView.render(); //render and append
			$('#main-content-area').empty();
			$('#main-content-area').append(appView.el);
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
				appCollection.add(appModel);

				//new view, show to user
				appView = new Colorapp.Views.AppView({
					model: appModel
				});
				appView.render(); //render and append
				$('#main-content-area').empty();
				$('#main-content-area').append(appView.el);
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


$(function(){
	if( $('#main-content-area') != [] ){
		//How do i make it so it only loads on all apps?
		Colorapp.initialize();
	}	
});










