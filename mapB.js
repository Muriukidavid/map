function initMap(){
	var Bcenter = new google.maps.LatLng(-0.86607, 37.55685);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Bcenter, 
		zoom: 16, 
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		heading: 0,
		tilt: 45
	});
	//define blockA by coordinates
	var blockB = [
		{lat: -0.85816, lng: 37.55126},
		{lat: -0.86201, lng: 37.54938},
		{lat: -0.87444, lng: 37.55128},
		{lat: -0.87391, lng: 37.55391},
		{lat: -0.8711, lng: 37.55402},
		{lat: -0.86892, lng: 37.55453},
		{lat: -0.86499, lng: 37.55555},
		{lat: -0.86228, lng: 37.55645},
		{lat: -0.86126, lng: 37.55458},
		{lat: -0.85991, lng: 37.55403},
		{lat: -0.85816, lng: 37.55126}
	];
	//create a polygon for blockA
	var sectB = new google.maps.Polygon({
		paths: blockB,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//Overlay blockA polygon on the map
	sectB.setMap(map);
	//design a grid
	var side = 60 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre
	drawGrid(blockB,side,52,map);
	//var heading = map.getHeading() || 0;
    //map.setHeading(heading + 90);
	rotate90(map);
}
function rotate90(map) {
	var heading = map.getHeading() || 0;
	map.setHeading(heading - 90);
}

