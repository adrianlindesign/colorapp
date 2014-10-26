var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var appCollection;


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
}



function setUpColorNavbar(){
	$('.color').on('click', function(){
		var color = this.id 

		var colorSortedArray = appCollection.where({color1: color})

		var colorSortedAppsCollection = new Colorapp.Collections.AppCollection(colorSortedArray)

		var listView = new Colorapp.Views.AppListView({
			collection: colorSortedAppsCollection
		});
		listView.render();
		$('#main-content-area').empty();
		$('#main-content-area').append(listView.el) // do i need this?
	});
}


function setUpGenreNavbar(){
	$('.genre').on('click', function(){
		var genre = this.id

		var genreSortedArray = appCollection.where({genre: genre})

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
		var searchedApp = $('#app-search-input').val();
		var searchedAppResult = appCollection.findWhere({name: searchedApp});
		
		//show search result
		if (searchedAppResult != undefined) {
			console.log("we have the app in stock!");

			var thisView = new Colorapp.Views.AppView({
				model: searchedAppResult
			});
			thisView.render();
			$('#main-content-area').empty();
			$('#main-content-area').append(thisView.el);

		} else { //if doesn't exist, add to database, then show
			console.log("somebody call the API!");

			// $.create('/apps', function(app){

			// 	var appModel = new Colorapp.Models.AppModel({
			// 		id: app["id"],
			// 		name: app["name"],
			//         genre: app["genre"],
			//         image_url: app["image_url"],
			//         free: app["free"],
			//         color1: app["color1"],
			//         hex1: app["hex1"],
			//         hex1_percent: app["hex1_percent"],
			//         color2: app["color2"],
			//         hex2: app["hex2"],
			//         hex2_percent: app["hex2_percent"],
			//         app_url: app["app_url"]  
			// 	});
			// 	appCollection.add(appModel);
			// });
		}
	});
}


$(function(){
	if( $('#main-content-area') != [] ){
		//How do i make it so it only loads on all apps?
		Colorapp.initialize();
	}	
});










