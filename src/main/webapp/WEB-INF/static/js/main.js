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

require(['jquery', 'bootstrap', 'backbone', 'app/login'], function ($, b, bb, LoginView) {
	$(function () {
		window.app = {};
		window.app.views = {};
		window.app.routers = {};
		app.views.loginView = new LoginView({el: '#app-states'});
		
		$('#app-carousel').carousel({
			interval: false,
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
		};
		
		var MainRouter = Backbone.Router.extend({
			routes: {
				''				 : 'app',				
				'session/:target': 'session',
				'*action'		 : 'catcher',
			},
			session: function (target) {
				var view = app.views.loginView;
				
				if (!view.rendered) {
					view.render(function () {
						view.activate();
					});
				}
			},
			app: function () {
				console.log('app-state');
				$('#app-carousel .item').removeClass('active');
				
				app.isAuth(function (e){					
					if (e) {
						$('#app-state').addClass('active');
					} else {
						app.routers.main.navigate("session/login", {trigger: true, replace: true});
					}
				});
			},
			catcher: function () {
				console.log('not-found-state');
				
				$('#app-carousel .item').removeClass('active');
				$('#not-found-state').addClass('active');
			},
		});
		
		app.routers.main = new MainRouter();
		Backbone.history.start();
	});
});