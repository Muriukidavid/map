function initMap(){
	var b2 = new google.maps.LatLng(-2.355094, 38.029740);
	var label = new google.maps.LatLng(-2.334150, 38.014605);
	var river = new google.maps.LatLng(-2.37049, 38.03137);
	var ketraco = new google.maps.LatLng(-2.375814, 37.992052);
	var k1 = new google.maps.LatLng(-2.41691, 37.96332);
	var k2 = new google.maps.LatLng(-2.362746, 38.022038);
	//var k2 = new google.maps.LatLng(-2.33937, 38.00962);
	var lon = 37.938764;
	var k3 = new google.maps.LatLng(-2.41725, 37.96347);
	var newlat = extrapolate(k3,k1,lon);
	var k4 = new google.maps.LatLng(newlat, lon);
	var k5 = new google.maps.LatLng(-2.391750, 37.952350);
	//create the map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 14, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	//define block2 by coordinates
	var block2 = [
		{lat: -2.33937 ,lng: 38.00962},//ne corner
		{lat: -2.362746,lng: 38.022038},
		{lat:-2.3644 ,lng: 38.02681},//se corner
		//{lat:-2.369581,lng: 38.043053},//sw corner
		//{lat: -2.35885, lng: 38.04150},//weather station
		//{lat: -2.354617,lng: 38.040762}//nw corner
		{lat:-2.37875, lng:38.07638},//River edge
		{lat:-2.30070, lng:38.06961},//17
		{lat:-2.29127, lng:38.06897},//15
		{lat:-2.29113, lng:38.03451}//14 new nw corner
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
	///*
	var block2Options = {
		 content: "UoN Kibwezi Field Station<br> Total area: "+block2area
		,boxStyle: {
		   border: "1px solid none"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "auto"
		  ,color:"black"
		  ,background:"none"
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
	//*/
	//Display the KETRACO lines
 	var klinepath = [k2,k5];
	var kline = new google.maps.Polyline({
		path:klinepath,
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	kline.setMap(map);
	var klinepath = [k3,k1,k4];
	var kline = new google.maps.Polyline({
		path:klinepath,
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	kline.setMap(map);
	//ketraco line distance
	d = Math.round(google.maps.geometry.spherical.computeDistanceBetween(k2,k5)/1000);
	//show ketraco line distance
	var ketracoOptions = {
		 content: "Distance: "+d+"Km"
		,boxStyle: {
		   border: "1px solid none"
		  ,textAlign: "center"
		  ,fontSize: "8pt"
		  ,width: "auto"
		  ,color:"black"
		  ,background:"none"
		 }
		,disableAutoPan: true
		,position: ketraco
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var ketracoLabel = new InfoBox(ketracoOptions);
	ketracoLabel.open(map);
	ketracoLabel.orientation = 270;
	//console.log("distance: "+Math.round(d)+"km");
	//var mx = new google.maps.Marker({position:river});
	//mx.setMap(map);
	//design a grid
	var side = 63.63 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block2,side,0,map);
}
