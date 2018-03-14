function initMap(){
	var b1 = new google.maps.LatLng(5.705250, -1.651415);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b1, 
		zoom: 16, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	//define block1 by coordinates
	var block1 = [
		{lat: 5.71147 ,lng: -1.64625548080101},
		{lat: 5.70701 ,lng: -1.64610276263578},
		{lat: 5.704196 ,lng: -1.64545482092552},
		{lat: 5.70443 ,lng: -1.64744599112667},
		{lat: 5.7041 ,lng: -1.64864209015763},
		{lat: 5.699628 ,lng: -1.65191018248593},
		{lat: 5.700168 ,lng: -1.65422681771735},
		{lat: 5.700705 ,lng: -1.65670442319815},
		{lat: 5.700857 ,lng: -1.65902358077025},
		{lat: 5.703033 ,lng: -1.66122373662922},
		{lat: 5.704548 ,lng: -1.66210624282373},
		{lat: 5.704811 ,lng: -1.66269406436502},
		{lat: 5.706304 ,lng: -1.66402421746343},
		{lat: 5.710399 ,lng: -1.65586626179604},
		{lat: 5.71147 ,lng: -1.64625548080101}
	];
	//create a polygon for block1
	var sect1 = new google.maps.Polygon({
		paths: block1,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//overlay block1 polygon on the map
	sect1.setMap(map);
	//calculate area of block1
	var block1_area = google.maps.geometry.spherical.computeArea(sect1.getPath());
	var block1_area = (block1_area/10000).toFixed(1)+"ha";
	//show info window at block1
	var block1Options = {
		 content: "Block 1<br> Total area: "+block1_area
		,boxStyle: {
		   border: "1px solid white"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "auto"
		  ,color:"black"
		  ,background:"white"
		 }
		,disableAutoPan: true
		//,pixelOffset: new google.maps.Size(-25, 0)
		,position: b1
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var block1Label = new InfoBox(block1Options);
	block1Label.open(map);
	
	//design a grid
	var side = 60; //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block1,side,0,map);
}
