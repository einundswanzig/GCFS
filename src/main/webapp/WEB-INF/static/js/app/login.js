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
			
			$.get('/static/template/_login-state.htm').done(function (data){
				$.templates('LoginTemplate', data);
				
				self.$el.html($.render.LoginTemplate({
					userPholder: 'Usuario',
					title: 'Inicio de sesion',
					passPholder: 'Contraseña',
				}));
				
				self.rendered = true;
				
				$('#login-form input').keypress(function (e) {
					if (e.which == 13) {
						e.preventDefault();
						$('#login-form').submit();
						
						return false;
					}
				}); // keypress
				
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
				}); // submit
				
				if (callback) {
					callback();
				}
			}); // done
		},
		activate: function () {
			$('#login-state').addClass('active');
		},
	});
});