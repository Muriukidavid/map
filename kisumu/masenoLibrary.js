function initMap(){
	var Bcenter = new google.maps.LatLng(-0.008656, 34.605508);
	var posB = new google.maps.LatLng(-0.004173, 34.604994);
	var myStyle = [
       {
         featureType: "all",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       },{
         featureType: "poi.government",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       },{
         featureType: "poi.business",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "poi.place_of_worship",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "water",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       },{
         featureType: "road",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       }
     ];
     
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		mapTypeControlOptions: {
         	mapTypeIds: ['mystyle', google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN]
       	},
		center: Bcenter, //define center of map 
		zoom: 16, //Zoom to fit map to screen
		mapTypeId: 'mystyle'//google.maps.MapTypeId.HYBRID
	});
	map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));
	map.setTilt(45);
	//console.log(map.data)
	//map.data.forEach(function(feature){console.log(feature.getGeometry().getType())});
	
	//define blockA by coordinates
	var blockB = [
		{lat: -0.015416, lng: 34.604545},
		{lat: -0.014566, lng: 34.603929},
		{lat: -0.013798, lng: 34.603266},
		{lat: -0.011433, lng: 34.603768},
		{lat: -0.009155, lng: 34.602093},
		{lat: -0.007820, lng: 34.602836},
		{lat: -0.006479, lng: 34.601858},
		{lat: -0.005792, lng: 34.602191},
		{lat: -0.006212, lng: 34.604271},
		{lat: -0.005987, lng: 34.605449},
		//{lat: -0.006871, lng: 34.608346},//added
		{lat: -0.004864, lng: 34.605652},
		//{lat: -0.005344, lng: 34.606585},
		{lat: -0.005555, lng: 34.608247},
		{lat: -0.008280, lng: 34.609086}
	];
	//blockB.forEach(function(entry){console.log(entry)});
	//create a polygon for blockB
	var sectB = new google.maps.Polygon({
		paths: blockB,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.3
	});
	//Overlay blockA polygon on the map
	sectB.setMap(map);
	//calculate area of blockB
	var z = google.maps.geometry.spherical.computeArea(sectB.getPath());
	var blockBarea = (z/10000).toFixed(1)+"ha";
	//show Info Window at the blockB
	var blockBOptions = {
		 content: "Maseno Botanical Garden<br> Total area: "+blockBarea+" "
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
		,position: posB
		,closeBoxURL: ""
		,isHidden: false
		,pane: "mapPane"
		,enableEventPropagation: true
	};
	var blockBLabel = new InfoBox(blockBOptions);
	blockBLabel.open(map);
	//design a grid
	var side = 60 //an acre is 63.63 by 63.63 meters, use grids of approximately square acre	
	drawGrid(blockB,side,side/2,map);
}
