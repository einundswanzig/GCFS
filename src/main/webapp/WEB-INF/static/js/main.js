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

require(['jquery', 'bootstrap', 'backbone', 'app/login' , 'app/app', 'app/not-found'], function ($, b, bb, LoginView, AppView, NotFoundView) {
	$(function () {
		window.app = {};
		window.app.views = {};
		window.app.routers = {};
		
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
				if (!app.views.login) {
					app.views.login = new LoginView({el: '#app-states'});
				}
				
				app.views.login.render(function () {
					app.views.login.activate();
				});
			},
			app: function () {
				if (!app.views.app) {
					app.views.app = new AppView({el: '#app-states'});
				}
				
				app.views.app.render(function () {
					app.views.app.activate();
				});				
			},
			catcher: function () {
				if (!app.views.notFound) {
					app.views.notFound = new NotFoundView({el: '#app-states'});
				}
				
				app.views.notFound.render(function () {
					app.views.notFound.activate();
				});
			},
		});
		
		app.routers.main = new MainRouter();
		Backbone.history.start();
	});
});