function initMap(){
	var b2 = new google.maps.LatLng(-3.190161, 39.791724);
	var k1 = new google.maps.LatLng(-3.19523, 39.78527);
	var label = new google.maps.LatLng(-3.178591, 39.783892);
	var k4 = new google.maps.LatLng(-3.18877, 39.79859);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 15, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	//define block2 by coordinates
	var block2 = [
		{lat: -3.19841,lng: 39.78569},
		{lat: -3.19145,lng: 39.80184},
		{lat: -3.18970,lng: 39.80129},
		{lat: -3.18877,lng: 39.79859},
		{lat: -3.18667,lng: 39.79448},
		{lat: -3.18118,lng: 39.78357}
	];
	//create a polygon for block2
	var sect2 = new google.maps.Polygon({
		paths: block2,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//Overlay block2 polygon on the map
	sect2.setMap(map);
	//calculate area of block2
	var block2area = google.maps.geometry.spherical.computeArea(sect2.getPath());
	var block2area = (block2area/10000).toFixed(1)+"ha";
	//console.log(block2area);
	//show Info Window at the block2
	var block2Options = {
		 content: "Weru Ranch<br> Total area: "+block2area
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
		,position: label
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var block2Label = new InfoBox(block2Options);
	block2Label.open(map);
	//Display the KETRACO line
	var klinepath = [k1,k4];
	var kline = new google.maps.Polyline({
		path:klinepath,
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	kline.setMap(map);
	//var x = new google.maps.LatLng(-3.19841, 39.78569);
	//var mx = new google.maps.Marker({position:x});
	//mx.setMap(map);
	//design a grid
	var side = 63 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block2,side,0,map);
}
