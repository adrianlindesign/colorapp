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


$(function(){
	if( $('#main-content-area') != [] ){
		//How do i make it so it only loads on all apps?
		Colorapp.initialize();
	}	
});










