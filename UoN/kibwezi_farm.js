function initMap(){
	var b2 = new google.maps.LatLng(-2.368704, 38.033438);//center of map
	var label = new google.maps.LatLng(-2.365247, 38.029992);//map label location
	var river = new google.maps.LatLng(-2.37049, 38.03137);//river location
	//create the map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 17, 
		mapTypeId: google.maps.MapTypeId.HYBRID
	});

	//define block2 by coordinates
	var block2 = [
		{lat: -2.36647,lng: 38.03211},
		{lat: -2.365795,lng: 38.030157},
		{lat: -2.369586,lng: 38.028848},
		{lat: -2.37049,lng: 38.03137},
		{lat: -2.37207,lng: 38.03622},
		{lat: -2.368125,lng: 38.037473},
		{lat: -2.36748,lng: 38.03550}
	];
	//create a polygon for block2
	var sect2 = new google.maps.Polygon({
		paths: block2,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#00FF00',
		fillOpacity: 0.5
	});
	//Overlay block2 polygon on the map
	sect2.setMap(map);
	//calculate area of block2
	var block2area = google.maps.geometry.spherical.computeArea(sect2.getPath());
	var block2area = (block2area/10000).toFixed(1)+"ha";
	//show Info Window at the block2
	///*
	var block2Options = {
		 content: "UoN Kibwezi Farmed portion<br> Total area: "+block2area
		,boxStyle: {
		   border: "1px solid none"
		  ,textAlign: "center"
		  ,fontSize: "12pt"
		  ,width: "auto"
		  ,color:"white"
		  ,background:"black"
		 }
		,disableAutoPan: true
		//,pixelOffset: new google.maps.Size(-25, 0)
		,position: label
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var block2Label = new InfoBox(block2Options);
	block2Label.open(map);
	//design a grid
	var side = 63.63 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block2,side,0,map,'#00FF00','#0000FF');
}
