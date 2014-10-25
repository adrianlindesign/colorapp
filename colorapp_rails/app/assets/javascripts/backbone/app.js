var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var appCollection;


Colorapp.initialize = function(){
	appCollection = new Colorapp.Collections.AppCollection();

	var listView = new Colorapp.Views.AppListView({
		collection: appCollection,
		// el: $('.penguin-list') // i think i'm generating an article, then appending to main
		el: $('#app-list')
	});

	appCollection.fetch();

	// $('.penguins').find('form').on('submit', function(e){
	// 	e.preventDefault();
	// 	var penguinName = $('input').val();
	// 	$('input').val('')
	// 	collection.create({name: penguinName})
	// })
}


$(function(){
	console.log($('#app-template'))
	Colorapp.initialize();
});
