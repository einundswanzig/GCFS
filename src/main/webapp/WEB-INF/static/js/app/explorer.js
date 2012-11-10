define(['jquery', 'backbone', 'jsrender', 'bootstrap-contextmenu'], function ($, bb, jr, bc){
	return Backbone.View.extend({
		render: function () {
			var self = this;
			
			$.get('/static/template/_treeview-block.htm').done(function (data) {
				$.templates('FolderViewBlockTemplate', data);
				
				$.get('/content').done(function (data) {
					self.$el.html($.render.FolderViewBlockTemplate(data));
				});
			});
		},
	});
});