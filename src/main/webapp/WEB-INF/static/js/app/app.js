define(['jquery', 'backbone', 'jsrender', 'jquery-ui'], function ($, bb, jsr, jui) {
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
			
			$.when($.get('/static/js/app/tmpl/app-state.html').done(function (data) {
				$.templates('AppTemplate', data);
				
				self.$el.html($.render.AppTemplate());
				
				self.rendered = true;
				
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