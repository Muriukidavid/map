function initMap(){
	var Acenter = new google.maps.LatLng(0.002555, 34.599214);
	var posA = new google.maps.LatLng(0.011209, 34.597755);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Acenter, //define center of map 
		zoom: 16, //Zoom to fit map to screen
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	//define blockA by coordinates
	var blockA = [
		{lat: -0.000454, lng: 34.590285},
		{lat: -0.007835, lng: 34.592479},
		{lat: -0.004644, lng: 34.596917},
		{lat: -0.004147, lng: 34.597563},
		{lat: -0.003673, lng: 34.598034},
		{lat: -0.002396, lng: 34.598667},
		{lat: -0.001780, lng: 34.599112},
		{lat: -0.001041, lng: 34.599851},
		{lat: -0.000661, lng: 34.600330},
		{lat: -0.000164, lng: 34.601125},
		{lat: 0.000254, lng: 34.601846},
		{lat: 0.000771, lng: 34.602758},
		{lat: 0.001298, lng: 34.603450},
		{lat: 0.001898, lng: 34.604238},
		{lat: 0.002830, lng: 34.604902},
		{lat: 0.003508, lng: 34.605240},
		{lat: 0.004499, lng: 34.605496},
		{lat: 0.005380, lng: 34.605647},
		{lat: 0.006267, lng: 34.605608},
		{lat: 0.007114, lng: 34.605457},
		{lat: 0.007836, lng: 34.605156 },
		{lat: 0.008382, lng: 34.604887},
		{lat: 0.008936, lng: 34.604517},
		{lat: 0.009403, lng: 34.604159},
		{lat: 0.009651, lng: 34.603952},
		{lat: 0.009978, lng: 34.603690},
		{lat: 0.010226, lng: 34.603451}
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
		 content: "Whole Block<br> Total area: "+blockAarea+" "
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
