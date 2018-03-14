function initMap(){
	var Acenter = new google.maps.LatLng(-0.002343, 34.593928);
	var posA = new google.maps.LatLng(0.002769, 34.594123);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Acenter, //define center of map 
		zoom: 16, //Zoom to fit map to screen
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	//define blockA by coordinates
	var blockA = [
		//{lat: 0.002553, lng: 34.594291},//0.001647, 34.594988 0.002553, 34.594291
		//{lat: -0.000550, lng: 34.590580},//-0.001401, 34.590894 -0.000550, 34.590580
		{lat: -0.000454, lng: 34.590285},
		//{lat: -0.004227, lng: 34.591713},//-0.004227, 34.591713
		//{lat: -0.004235, lng: 34.591972},//-0.004235, 34.591972
		//{lat: -0.007332, lng: 34.593087},//-0.007332, 34.593087
		{lat: -0.007835, lng: 34.592479},
		{lat: -0.004644, lng: 34.596917},
		{lat: -0.004147, lng: 34.597563},
		{lat: -0.003673, lng: 34.598034},
		{lat: -0.002991, lng: 34.598250},
		{lat: -0.002313, lng: 34.597577},
		{lat: -0.001827, lng: 34.596762},//-0.003162, 34.597646 -0.002396, 34.598667
		{lat: 0.001670, lng: 34.595037},
		{lat: 0.001725, lng: 34.594750},
		{lat: 0.002017, lng: 34.594512},
		{lat: 0.002202, lng: 34.593968},
		{lat: 0.002056, lng: 34.593339}
	];
	//create a polygon for blockA
	var sectA = new google.maps.Polygon({
		paths: blockA,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//Overlay blockA polygon on the map
	sectA.setMap(map);
	//calculate area of blockA
	var z = google.maps.geometry.spherical.computeArea(sectA.getPath());
	var blockAarea = (z/10000).toFixed(1)+"ha";
	//show Info Window at the blockA
	var blockAOptions = {
		 content: "Block A<br> Total area: "+blockAarea+" "
		,boxStyle: {
		   border: "1px solid white"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "auto"
		  ,color:"black"
		  ,background:"white"
		 }
		,disableAutoPan: true
		,pixelOffset: new google.maps.Size(-25, -18)
		,position: posA
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var blockALabel = new InfoBox(blockAOptions);
	blockALabel.open(map);
	//design a grid
	var side = 60 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(blockA,side,side/2,map);
}
