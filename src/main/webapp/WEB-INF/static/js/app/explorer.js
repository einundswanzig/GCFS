define(['jquery', 'backbone', 'jsrender', 'bootstrap-contextmenu'], function ($, bb, jr, bc){
	return Backbone.View.extend({
		render: function () {
			var el = this.$el;
			
			$.ajax({
				url: '/content',
			}).done(function (data) {
				var folderview = '<div class="folderview">' + $('#folderview-list-tmpl').render(data) + "</div>";
				
				el.html(folderview);				
			});
		}
	});
});