function initMap(){
	var b2 = new google.maps.LatLng(-3.524450, 39.516824);
	var k11 = new google.maps.LatLng(-3.537300,39.514160);
	var k12 = new google.maps.LatLng(-3.534450,39.516450);
	var label = new google.maps.LatLng(-3.519199, 39.512918);
	var lon = 39.522436;
	//console.log(b2.lat());
	var newlat = extrapolate(k11,k12,lon);
	//console.log("New lat: "+testlat);
	//create our map
	var k13 = new google.maps.LatLng(newlat, lon);
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 16, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	//define block2 by coordinates
	var block2 = [
		//{lat: -3.53893,lng: 39.53462},
		//{lat: -3.54380,lng: 39.51732},
		//{lat: -3.53730,lng: 39.51416},
		//{lat: -3.53445,lng: 39.51645}, //ketraco line p1
		{lat: -3.529609,lng: 39.513760},
		{lat: -3.529289,lng: 39.520538},
		//{lat: -3.520535,lng: 39.517511},
		{lat: -3.520341,lng: 39.519202},
		//{lat: -3.524399,lng: 39.513118}
		{lat: -3.520673,lng: 39.512959}
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
		 content: "Mapotea Group Ranch<br> Total area: "+block2area
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
	var klinepath = [k11,k12,k13];
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
