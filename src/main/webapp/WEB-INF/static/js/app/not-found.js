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
			
			$.when($.get('/static/template/_not-found-state.htm').done(function (data) {
				$.templates('NotFoundTemplate', data);
				
				self.$el.html($.render.NotFoundTemplate());
				
				self.rendered = true;
				
				if (callback) {
					callback();
				}
			}));
		},
		activate: function () {
			$('#not-found-state').addClass('active');
		},
	});
});