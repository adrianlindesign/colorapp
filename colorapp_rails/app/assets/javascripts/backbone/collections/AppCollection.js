var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Collections.AppCollection = Backbon.Collections.extend({
	model: Colorapp.Models.AppModel,
	url: '/apps'
});