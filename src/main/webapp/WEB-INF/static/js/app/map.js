define(['jquery', 'jquery-ui-map', 'gmap3'], function() {
	$('#main').gmap({ 
		zoom: 13,
		center: '32.508676, -116.979418',
	});
	
	$('#main').gmap().bind('init', function(e, map) {
		$(map).click(function(e) {
			$('#main').gmap('addMarker', {
				bounds: false,
				draggable: true,
				position: e.latLng,
			});
		});
	});
});