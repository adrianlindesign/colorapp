var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };
var collection;


Colorapp.initialize = function(){
	collection = new Colorapp.Collections.AppCollection();

	var listView = new Colorapp.Views.PenguinListView({
		collection: collection,
		el: $('.penguin-list')
	});

	collection.fetch();

	// $('.penguins').find('form').on('submit', function(e){
	// 	e.preventDefault();
	// 	var penguinName = $('input').val();
	// 	$('input').val('')
	// 	collection.create({name: penguinName})
	// })
}



$(function(){
	// console.log($('#penguin-template'))

	Colorapp.initialize();

});
