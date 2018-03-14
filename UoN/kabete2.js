function initMap(){
	var b2 = new google.maps.LatLng(-1.243325, 36.746497);//(-1.24556,36.71114);
	var substation = new google.maps.LatLng(-1.238929, 36.734277);
	var p1 = new google.maps.LatLng(-1.245027,36.735969);
	var p1_label = new google.maps.LatLng(-1.239078, 36.734755);
	var label = new google.maps.LatLng(-1.240679, 36.745964);
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 16, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	//marker for substation
	var markerSub = new google.maps.Marker({
		position:substation
	});
	markerSub.setMap(map);
	//define block1 by coordinates
	var block2 = [
		{lat: -1.248920,lng: 36.740021},
		{lat: -1.248551,lng: 36.741144},
		{lat: -1.249502,lng: 36.742916},
		{lat: -1.244457,lng: 36.746407},// bend
		{lat: -1.245690,lng: 36.748512},
		{lat: -1.246525,lng: 36.751897},
		{lat: -1.245675,lng: 36.755119},
		{lat: -1.241977,lng: 36.756368},
		{lat: -1.243686,lng: 36.748824},
		{lat: -1.240666,lng: 36.741979},
		{lat: -1.245027,lng: 36.735969}
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
	//show Info Window at the block2
	var block2Options = {
		 content: "Kabete Section 1<br> Total area: "+block2area
		,boxStyle: {
		   border: "1px solid white"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "auto"
		  ,color:"black"
		  ,background:"white"
		 }
		,disableAutoPan: true
		,position: label
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var block2Label = new InfoBox(block2Options);
	block2Label.open(map);
	//Display the KETRACO line
	var klinepath = [substation,p1];
	var kline = new google.maps.Polyline({
		path:klinepath,
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	kline.setMap(map);
	distance = google.maps.geometry.spherical.computeDistanceBetween (substation, p1);
	console.log(distance);
	//show label for distance
	var distanceOptions = {
		 content: "Feed-in point distance: "+Math.round(distance)+" Meters"
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
		,position: p1_label
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var p1Label = new InfoBox(distanceOptions);
	p1Label.open(map);
	//Draw a 1 acre grid
	var side = 63; //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block2,side,0,map);
}

