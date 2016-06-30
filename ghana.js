function initMap(){
	var center = new google.maps.LatLng(5.1355797, -1.28758388888889);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: center, 
		zoom: 17, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	//define block by coordinates
	var block = [
		{lat: 5.1355797,lng: -1.28758388888889},
		{lat: 5.13864,lng: -1.287585},
		{lat: 5.1386131,lng: -1.28621027777778},
		{lat: 5.1354989,lng: -1.28348138888889},
		{lat: 5.1355797,lng: -1.28758388888889}
	];
	//create a polygon for block
	var sectG = new google.maps.Polygon({
		paths: block,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//Overlay block polygon on the map
	sectG.setMap(map);
	//calculate area of block
			var z = google.maps.geometry.spherical.computeArea(sectG.getPath());
			var blockGarea = (z/10000).toFixed(1)+"ha";
  			//show Info Window at the blockA
			var blockGOptions = {
				 content: "Block 2<br> Total area: "+blockGarea
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
				,position: center
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			var blockGLabel = new InfoBox(blockGOptions);
			blockGLabel.open(map);
		//var x = new google.maps.LatLng(1.830661,-6.456894);
		//var mx = new google.maps.Marker({
		//		position:x
		//	});
		//mx.setMap(map);
	//design a grid
	var side = 4 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block,side/2,side/4,map);
}
