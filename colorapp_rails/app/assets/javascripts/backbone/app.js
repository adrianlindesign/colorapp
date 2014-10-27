var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var appCollection;
var selectedColor;



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
}



function setUpColorNavbar(){
	$('.color').on('click', function(){
		//to toggle one class
		$('.selected-color').toggleClass('selected-color');
		$(this).toggleClass('selected-color');

		//choose color (scope is global, will be used in genre as well)
		selectedColor = this.id

		//change the message
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


function setUpGenreNavbar(){
	$('.genre').on('click', function(){

		var sortedApps;

		// if color is chosen, use it, else, use generic appCollection
		if (selectedColor == undefined){
			sortedApps = appCollection.clone(); //do not redfine appCollection, we'll need it later
		} else {
			sortedApps = createColorCollection(selectedColor);
		}
		
		var genre = this.id

		//change the message
		$('#message-genre').text(genre);

		var genreSortedArray = sortedApps.where({genre: genre})

		var genreSortedAppsCollection = new Colorapp.Collections.AppCollection(genreSortedArray)

		var listView = new Colorapp.Views.AppListView({
			collection: genreSortedAppsCollection
		});
		listView.render();
		$('#main-content-area').empty();
		$('#main-content-area').append(listView.el) // do i need this?
	});
}

function setUpSearchBar(){
	$('#app-search-button').on('click', function(){
		var app = $('#app-search-input').val();
		var appResult = appCollection.findWhere({name: app});

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

		} else { //if doesn't exist, add to database, then show
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
		}
		$('#app-search-input')[0].value = ""; // clear content
		
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










