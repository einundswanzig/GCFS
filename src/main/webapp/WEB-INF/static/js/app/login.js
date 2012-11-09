define(['jquery', 'backbone', 'jsrender', 'jquery-ui'], function ($, bb, jsr, jui) {
	return Backbone.View.extend({
		rendered: false,
		render: function (callback) {
			var self = this;
			
			this.rendered = true;
			
			$.when($.get('/static/js/app/tmpl/login-state.html')).done(function (data){				
				$.templates('loginTmpl', data);
				
				self.$el.html($.render.loginTmpl({
					userPholder: 'Usuario',
					title: 'Inicio de sesion',
					passPholder: 'Contraseña',
				}));
				
				$('#login-form input').keypress(function (e) {
					if (e.which == 13) {
						e.preventDefault();
						$('#login-form').submit();
						
						return false;
					}
				});
				
				$('#login-form').submit(function (e) {
					e.preventDefault();
					
					$.ajax({
						  type: 'POST',
						  url: '/api/auth/login',
						  data: $(this).serialize(),
						  success: function(data, stat, xhr) {
							  var target = xhr.getResponseHeader('Location').replace(window.location.origin, '');

							  app.routers.main.navigate(target, {trigger: true, replace: true});
						  },
						  error: function (xhr, stat, e) {
							  console.log('login-error');
							  $('#login-container').effect('shake');
						  },
						});
					
					return false;
				});
				
				if (callback) {
					callback();
				}
			});
		},
		activate: function () {
			$('#login-state').addClass('active');
		},
	});
});