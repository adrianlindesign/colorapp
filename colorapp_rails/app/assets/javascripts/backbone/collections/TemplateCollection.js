var Colorapp = Colorapp || { Models: {}, Collections: {}, Views: {} };

Colorapp.Collections.TemplateCollection = Backbone.Collection.extend({
	model: Colorapp.Models.TemplateModel,
	url: '/templates'
});