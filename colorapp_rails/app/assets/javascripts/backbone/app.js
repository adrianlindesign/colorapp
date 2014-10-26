var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var appCollection;


Colorapp.initialize = function(){
	appCollection = new Colorapp.Collections.AppCollection();

	var listView = new Colorapp.Views.AppListView({
		collection: appCollection
		// el: $('.penguin-list') // i think i'm generating an article, then appending to main
	});

	appCollection.fetch();
	$('#main-content-area').append(listView.el)
	

	// $('.penguins').find('form').on('submit', function(e){
	// 	e.preventDefault();
	// 	var penguinName = $('input').val();
	// 	$('input').val('')
	// 	collection.create({name: penguinName})
	// })

	setUpColorNavbar();


}


function setUpColorNavbar(){
	//setting up the color navbar to sort colors
	$('.color').on('click', function(){
		var color = this.id
		console.log(color) //black, blue etc

		var colorSortedApps = appCollection.where({color1: color})
		var listView = new Colorapp.Views.AppListView({
			collection: colorSortedApps
		});

		$('#main-content-area').append(listView.el) // do i need this?
	});
}


$(function(){
	Colorapp.initialize();
});


