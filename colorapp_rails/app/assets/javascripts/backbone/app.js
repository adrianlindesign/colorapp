var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var appCollection;


Colorapp.initialize = function(){
	appCollection = new Colorapp.Collections.AppCollection();

	var listView = new Colorapp.Views.AppListView({
		collection: appCollection
	});

	// appCollection.fetch();

	$('#main-content-area').append(listView.el)

	setUpColorNavbar();
	setUpGenreNavbar();
	setUpSearchBar();
	setUpTemplateToggle();
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










