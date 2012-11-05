<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><!DOCTYPE html>
<!--[if lt IE 7]>     <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>        <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>        <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"> <!--<![endif]-->
<head>

<meta charset="utf-8">
<meta name="description" content="">
<meta name="viewport" content="width=device-width">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>Gran Comendador File System</title>

<link rel="stylesheet" href="/static/css/bootstrap.min.css">
<style>
	body {
		padding-top: 60px;
		background: #f0f0f0;
		padding-bottom: 40px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}
</style>
<link rel="stylesheet" href="/static/css/bootstrap-responsive.min.css">
<link rel="stylesheet" href="/static/css/main.css">

<script src="/static/js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script>

<script id="folderview-list-tmpl" type="text/x-handlebars-template">
<ul><li>
	<input id="{{:id}}" type="checkbox" {{if #parent == null}}checked{{/if}} />
	<label for="{{:id}}">{{:name}}</label>
	{{for children tmpl="#folderview-list-tmpl"/}}
</li></ul>
</script>
</head>
<body>
	<!--[if lt IE 7]>
	    <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
	<![endif]-->

	<div id="appCarousel" class="carousel slide">
	<div class="carousel-inner">			
			<div id="loginState" class="item">
				<div class="shadow-box login-form">
					<form id="loginForm">
						<h2>Inicio de sesion</h2>
						<input name="user" type="text" class="input-block-level" placeholder="Usuario">
						<input name="pass" type="password" class="input-block-level" placeholder="Contrase&ntilde;a">						
					</form>					
				</div>
			</div>
			
			<div id="appState" class="item">
				<div class="navbar navbar-inverse navbar-fixed-top">
					<div class="navbar-inner">
						<div class="container-fluid">
							<a class="btn btn-navbar" data-toggle="collapse"data-target=".nav-collapse"> 
								<span class="icon-bar"></span>
								<span class="icon-bar"></span> 
								<span class="icon-bar"></span>
							</a>
							<a class="brand" href="#">GCFS</a>
							<div class="nav-collapse collapse">
								<p class="navbar-text pull-right">Logged in as <a href="#" class="navbar-link">Username</a></p>
								<ul class="nav">
									<li class="active"><a href="#">Home</a></li>
									<li><a href="#about">About</a></li>
									<li><a href="#contact">Contact</a></li>
								</ul>
							</div><!--/nav-collapse-->
						</div>
					</div>
				</div><!--/nav-bar-->
				
				<div class="container-fluid">
					<div class="row-fluid">
						<div class="span2">
							<div class="well sidebar-nav">
								<ul class="nav nav-list">
									<li class="nav-header">Explorer</li>
									<li>
										<div id="explorer"></div>
									</li>
								</ul>
							</div>
						</div>
						<div class="span10">
							<div class="hero-unit well">
								<button id="test" class="btn btn-large btn-primary">Click</button>
								<button id="lout" class="btn btn-large btn-primary">Logout</button>								
							</div>
						</div>
					</div>
				</div>
			</div><!--/item-->
			
			<div id="notFoundState" class="item">
				<div class="shadow-box not-found-box">
					<h1>Not found <span>:(</span></h1>
				</div>
			</div>
		</div>
	</div><!--/carousel-->
	
	<script data-main="/static/js/main" src="/static/js/vendor/require-2.1.1.min.js"></script>
</body>
</html>