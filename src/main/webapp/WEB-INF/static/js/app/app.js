define(['jquery', 'backbone', 'jsrender', 'jquery-ui', 'app/explorer'], function ($, bb, jsr, jui, ExplorerView) {
	return Backbone.View.extend({
		rendered: false,
		render: function (callback) {
			if (this.rendered) {
				if (callback) {
					callback();
				}
				
				return;
			}
			
			var self = this;
			
			$.when($.get('/static/template/_app-state.htm').done(function (data) {
				$.templates('AppTemplate', data);
				self.$el.html($.render.AppTemplate());
				self.rendered = true;
				
				new ExplorerView({el: '#explorer'}).render();
				
				if (callback) {
					callback();
				}
			}));
		},
		activate: function () {
			$('#app-state').addClass('active');
		},
	});
});