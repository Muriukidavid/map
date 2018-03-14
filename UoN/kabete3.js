function initMap(){
	var b2 = new google.maps.LatLng(-1.24825,36.70502);//center of map
	var substation = new google.maps.LatLng(-1.238929, 36.734277);
	var p1 = new google.maps.LatLng(-1.237443, 36.720584);
	var p2 = new google.maps.LatLng(-1.243491, 36.717714);
	var p1_label = new google.maps.LatLng(-1.237852, 36.720613);
	var label = b2;
	var label2 = new google.maps.LatLng(-1.242605, 36.702459);
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 17, 
		mapTypeId: google.maps.MapTypeId.HYBRID
	});
	//marker for substation
	var markerSub = new google.maps.Marker({
		position:substation
	});
	markerSub.setMap(map);
	//define block2 by coordinates
	var block2 = [
		{lat: -1.24877 ,lng: 36.70597},
		{lat: -1.24915 ,lng: 36.70540},
		{lat: -1.24833 ,lng: 36.70398 },
		{lat: -1.24717 ,lng: 36.70173 },
		{lat: -1.24650 ,lng: 36.70294 },
		{lat: -1.24594 ,lng: 36.70395 },
		//{lat: -1.24519 ,lng:36.70405 }//Water point
	];
	//define block3 by coordinates
	var block3 = [
		{lat: -1.24446 ,lng: 36.70530},
		{lat: -1.24468 ,lng: 36.70480},
		{lat: -1.24464 ,lng: 36.70428},
		{lat: -1.24436 ,lng: 36.70203},
		{lat: -1.24461 ,lng: 36.70187},
		{lat: -1.24485 ,lng: 36.70033},
		{lat: -1.24209 ,lng: 36.70099}
	];
	//define block1 by coordinates
	var block1 = [
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
	//define block2 by coordinates
	var block4 = [
		{lat: -1.24556 ,lng: 36.71114},
		{lat: -1.245830,lng: 36.717436},
		{lat: -1.24381 ,lng: 36.71814},//substation
		{lat: -1.24078 ,lng: 36.71314},
		{lat: -1.24123 ,lng: 36.71229},
		{lat: -1.24095 ,lng: 36.71113},
		{lat: -1.241681,lng: 36.710456},
		{lat: -1.242755,lng: 36.713080},
		{lat: -1.24405 ,lng: 36.71286},
		{lat: -1.242237,lng: 36.709134},
		{lat: -1.243529,lng: 36.707061}
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
	//create a polygon for block2
	var sect3 = new google.maps.Polygon({
		paths: block3,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//create a polygon for block2
	var sect1 = new google.maps.Polygon({
		paths: block1,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//create a polygon for block4
	var sect4 = new google.maps.Polygon({
		paths: block4,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//Overlay block2 polygon on the map
	sect2.setMap(map);
	//Overlay block3 polygon on the map
	sect3.setMap(map);
	//Overlay block1 polygon on the map
	sect1.setMap(map);
	//
	sect4.setMap(map);
	//calculate area of block2
	var block2area = google.maps.geometry.spherical.computeArea(sect2.getPath());
	var block3area = google.maps.geometry.spherical.computeArea(sect3.getPath());
	var block2area = (block2area/10000).toFixed(1)+"ha";
	var block3area = (block3area/10000).toFixed(1)+"ha";
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
		//,pixelOffset: new google.maps.Size(-25, 0)
		,position: label
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var block3Options = {
		 content: "Kabete Section 3<br> Total area: "+block3area
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
		,position: label2
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var block2Label = new InfoBox(block2Options);
	var block3Label = new InfoBox(block3Options);
	block2Label.open(map);
	block3Label.open(map);
	//Display the KETRACO line
	var klinepath = [substation,p1,p2];
	var kline = new google.maps.Polyline({
		path:klinepath,
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	kline.setMap(map);
	distance = (google.maps.geometry.spherical.computeDistanceBetween (p2, p1)+google.maps.geometry.spherical.computeDistanceBetween (p1, substation));
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
	//var x = new google.maps.LatLng(-3.19841, 39.78569);
	//var mx = new google.maps.Marker({position:x});
	//mx.setMap(map);
	//design a grid
	var side = 63; //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block2,side,0,map);
	drawGrid(block3,side,0,map);
}
