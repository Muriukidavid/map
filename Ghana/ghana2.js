function initMap(){
	var b2 = new google.maps.LatLng(5.1370, -1.28485);
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: b2, 
		zoom: 18, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	//define block2 by coordinates
	var block2 = [
		{lat: 5.1355797,lng: -1.28758388888889},
		{lat: 5.13864,lng: -1.287585},
		{lat: 5.1386131,lng: -1.28621027777778},
		{lat: 5.1354989,lng: -1.28348138888889},
		{lat: 5.1355797,lng: -1.28758388888889}
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
				 content: "Block 2<br> Total area: "+block2area
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
				,position: b2
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			var block2Label = new InfoBox(block2Options);
			block2Label.open(map);
		//var x = new google.maps.LatLng(1.830661,-6.456894);
		//var mx = new google.maps.Marker({
		//		position:x
		//	});
		//mx.setMap(map);
	//design a grid
	var side = 63 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(block2,side,0,map);
}
