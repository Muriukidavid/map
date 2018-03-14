function initMap(){
	var Acenter = new google.maps.LatLng(-1.361967, 36.676559);
	var posA = new google.maps.LatLng(-1.361737, 36.676583);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Acenter, //define center of map 
		zoom: 30, //Zoom to fit map to screen
		mapTypeId: google.maps.MapTypeId.HYBRID
	});
	//define blockA by coordinates
	var blockA = [
		{lat: -1.362095, lng: 36.676636},
		{lat: -1.361969, lng: 36.676866},
		{lat: -1.36185, lng: 36.676809},
		{lat: -1.361967, lng: 36.676559}
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
	var blockAarea = z.toFixed(1)+" square meters";
	//show Info Window at the blockA
	var blockAOptions = {
		 content: "Oloolua land<br/> Total area: "+blockAarea+" "
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
	//var side = 60 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	//drawGrid(blockA,side,side/2,map);
}
