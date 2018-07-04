function initMap(){
	var Acenter = new google.maps.LatLng(-0.133315, 34.583545); 
	var posA = new google.maps.LatLng(-0.127617, 34.580703);//-0.128115, 34.583823);
	//power feed in 11KV Line
	var lv_conn = new google.maps.LatLng( -0.1287372, 34.5868896);
	var lv_point = new google.maps.LatLng(-0.11873, 34.59256);
	var lv_info = new google.maps.LatLng(-0.122890, 34.590057);
	var pathendsA = [lv_point,lv_conn];
	var pathA = new google.maps.Polyline({
		path:pathendsA,
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 4
	});
	length=google.maps.geometry.spherical.computeDistanceBetween(lv_point,lv_conn)/1000;
	//show Info Box at the feed-in line
	var lv_Options = {
		 content: "Distance:<br/>"+length.toFixed(2)+" KM"
		,boxStyle: {
		   border: "1px solid white"
		  ,textAlign: "center"
		  ,fontSize: "10pt"
		  ,width: "100px"
		  ,color:"black"
		  ,background:"white"
		 }
		,disableAutoPan: true
		,pixelOffset: new google.maps.Size(8,0)
		,position: lv_info
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var lv_Label = new InfoBox(lv_Options);
	var markerlv = new google.maps.Marker({
		position:lv_point,
		title: "LatLng(-0.11873, 34.59256)" 
	});
	
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Acenter, //define center of map 
		zoom: 15, //Zoom to fit map to screen
		mapTypeId: google.maps.MapTypeId.HYBRID
	});
	//Connection line:
	pathA.setMap(map);
	//connection line label
	lv_Label.open(map);
	//infoWindow for power feed in point
	markerlv.setMap(map);
	var infowindowFIPA = new google.maps.InfoWindow({
		content: "Power Feed in point<br> 11KV Line"
	});
	infowindowFIPA.open(map,markerlv);
	//define land parcel by coordinates
	var Seme_Data = [
		{ lat: -0.1292401, lng:34.5880661},
		{ lat: -0.1287372, lng:34.5868896},
		{ lat: -0.128934, lng:34.585228},
		{ lat: -0.130036, lng:34.584331},
		{ lat: -0.130503, lng:34.583709},
		{ lat: -0.130935, lng:34.583267},
		{ lat: -0.131568, lng:34.582916},
		{ lat: -0.131892, lng:34.582698},
		{ lat: -0.132105, lng:34.582466},
		{ lat: -0.132369, lng:34.581988},
		{ lat: -0.132546, lng:34.58178},
		{ lat: -0.1322493, lng:34.5807732},
		{ lat: -0.1331542, lng:34.58007},
		{ lat: -0.1343385, lng:34.5797014},
		{ lat: -0.1353376, lng:34.579392},
		{ lat: -0.1362333, lng:34.5791789},
		{ lat: -0.1378263, lng:34.5788026},
		{ lat: -0.1382978, lng:34.5792885},
		{ lat: -0.138249, lng:34.5797746},
		{ lat: -0.138999, lng:34.579884},
		{ lat: -0.139049, lng:34.580311},
		{ lat: -0.139197, lng:34.580664},
		{ lat: -0.1392, lng:34.581057},
		{ lat: -0.139072, lng:34.581524},
		{ lat: -0.138566, lng:34.581646},
		{ lat: -0.138427, lng:34.581913},
		{ lat: -0.137136, lng:34.582131},
		{ lat: -0.1359532, lng:34.5825866},
		{ lat: -0.1352926, lng:34.5828297},
		{ lat: -0.1345027, lng:34.5832868},
		{ lat: -0.133704, lng:34.58389},
		{ lat: -0.133019, lng:34.584614},
		{ lat: -0.132769, lng:34.585023},
		{ lat: -0.131925, lng:34.585761},
		{ lat: -0.131639, lng:34.586129},
		{ lat: -0.130691, lng:34.586911}
	];

	//create a polygon for Seme
	var sectA = new google.maps.Polygon({
		paths: Seme_Data,
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
		 content: "Total area: "+blockAarea+" "
		,boxStyle: {
		   border: "1px solid white"
		  ,textAlign: "center"
		  ,fontSize: "10pt"
		  ,width: "140px"
		  ,color:"black"
		  ,background:"white"
		 }
		,disableAutoPan: true
		,pixelOffset: new google.maps.Size(0, 0)
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
	drawGrid(Seme_Data,side,side/2,map);
}
