require.config({
	shim: {
        'jquery-ui': {
        	deps: ['jquery'],
        },
        'jsrender': {
        	deps: ['jquery'],
        },
        'bootstrap': {
        	deps: ['jquery'],
        },
        'bootstrap-contextmenu': {
        	deps: ['jquery', 'bootstrap'],
        },        
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
        },
        'gmap3': {
        	deps: ['jquery', 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBgcUti486u7_yltjoNoexS8bgXGonqOY8&sensor=false'],
        },
        'jquery-ui-map': {
        	deps: ['jquery', 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBgcUti486u7_yltjoNoexS8bgXGonqOY8&sensor=false'],
        },
	},
	paths: {		
		'async': './vendor/async',
		'jsrender': './vendor/jsrender',
		'gmap3': './vendor/gmap3.-5.0.min',
		'jquery': './vendor/jquery-1.8.2.min',
		'backbone': './vendor/backbone-0.9.2.min',
        'bootstrap': './vendor/bootstrap.2.2.1.min',      
        'underscore': './vendor/underscore-1.4.2.min',
        'jquery-ui': './vendor/jquery-ui-1.9.1.custom.min',
        'jquery-ui-map': './vendor/jquery.ui.map-3.0.rc1.min',
        'bootstrap-contextmenu': './vendor/bootstrap-contextmenu',
	},
});

require(['jquery', 'bootstrap', 'jquery-ui', 'backbone'], function ($, b, ui, bb) {
	$(function () {
		window.app = {};
		window.app.routers = {};
		
		$('#test').click(function () {
			app.isAuth();
		});
		
		$('#lout').click(function () {
			app.logout(function (e) {
				if (e) {
					app.routers.main.navigate('session/logout', {trigger: true, replace: true});
				}
			});
		});
		
		app.logout = function (callback) {
			$.ajax({
				type: 'HEAD',
				  url: '/api/auth/logout',
				  data: $(this).serialize(),
				  success: function(data, stat, xhr) {
					  console.log('logout-ok');
					  
					  if (callback) {
						  callback(true);
					  }
				  },
				  error: function (xhr, stat, e) {
					  console.log('logout-error');
					  
					  if (callback) {
						  callback(false);
					  }
				  },
			});
		};
		
		app.isAuth = function (callback) {
			$.ajax({
				type: 'HEAD',
				  url: '/api/auth',
				  data: $(this).serialize(),
				  success: function(data, stat, xhr) {
					  console.log('auth-ok');
					  
					  if (callback) {						  
						  callback(true);
					  }
				  },
				  error: function (xhr, stat, e) {
					  console.log('auth-unauthorized');
					  
					  if (callback) {						  
						  callback(false);
					  }
				  },
			});
		}
		
		app.routers.Main = Backbone.Router.extend({
			routes: {
				'': 'app',				
				'session/:target': 'session',
				'*action': 'catcher',
			},
			session: function (target) {
				console.log('session-state: ' + target);	
				$('#appCarousel .item').removeClass('active');
				
				app.isAuth(function (e){
					
					if (e) {
						app.routers.main.navigate('', {trigger: true, replace: true});
					} else {
						$('#loginState').addClass('active');
					}
				});				
			},
			app: function () {
				console.log('app-state');
				$('#appCarousel .item').removeClass('active');
				
				app.isAuth(function (e){					
					if (e) {
						$('#appState').addClass('active');
					} else {
						app.routers.main.navigate("session/login", {trigger: true, replace: true});
					}
				});
			},
			catcher: function () {
				console.log('not-found-state');
				
				$('#appCarousel .item').removeClass('active');
				$('#notFoundState').addClass('active');
			},
		});			
		
		app.routers.main = new app.routers.Main();
		Backbone.history.start();
		
		$("#appCarousel").carousel({
			interval: false,
		});
		
		$('#loginForm input').keypress(function (e) {
			if (e.which == 13) {
				e.preventDefault();
				$('#loginForm').submit();
				
				return false;
			}
		});
		
		$('#loginForm').submit(function (e) {
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
				  },
				});
			
			return false;
		});
	});
});