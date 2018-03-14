function initMap(){
	var Acenter = new google.maps.LatLng(-0.856172, 37.547088);
	var posA = new google.maps.LatLng(-0.85189, 37.5435);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Acenter, 
		zoom: 17, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	//define blockA by coordinates
	var blockA = [
		{lat: -0.852752, lng: 37.546884},
		{lat: -0.853841, lng: 37.545049},
		{lat: -0.855214, lng: 37.543826},
		{lat: -0.855782, lng: 37.543912},
		{lat: -0.856576, lng: 37.54182},
		{lat: -0.860578, lng: 37.545349},
		{lat: -0.8586073, lng: 37.546066},
		{lat: -0.857617, lng: 37.545478},
		{lat: -0.856372, lng: 37.547088},
		{lat: -0.8560944, lng: 37.546868},
		{lat: -0.8553891, lng: 37.548126},
		{lat: -0.8559362, lng: 37.5488394},
		{lat: -0.857316, lng: 37.549502},
		{lat: -0.858003, lng: 37.551261},
		{lat: -0.8553, lng: 37.55035},
		{lat: -0.853036, lng: 37.550735},
		{lat: -0.852752, lng: 37.546884}
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
		 content: "Block A<br> Total area: "+blockAarea
		,boxStyle: {
		   border: "1px solid white"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "auto"
		  ,color:"black"
		  ,background:"white"
		 }
		,disableAutoPan: true
		,pixelOffset: new google.maps.Size(-25, 0)
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
