function initMap(){
	var mapCenter = new google.maps.LatLng(0.491621, 37.904205);
	var uonProjects = [
	{index:1, lat:-2.355094, lng:38.029740, offset:[0,0], name:"University of Nairobi(Kibwezi): 2x20MW"},
	{index:2, lat:-1.273372, lng:36.805856, offset:[0,0], name:"University of Nairobi Cost Cutting: 1MW"},
	{index:3, lat:-3.190161, lng:39.791724, offset:[0,0], name:"County Government of Kilifi: 2x20MW"},
	{index:4, lat:+0.002555, lng:34.599214, offset:[0,0], name:"County Government of Kisumu: 40MW"},
	{index:5, lat:-0.856172, lng:37.547088, offset:[0,0], name:"TARDA Masinga: 40MW"}
	];
	
	//create the map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: mapCenter, 
		zoom: 6, 
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	
	//debugging
	//uonProjects.forEach(function(project){console.log(project.index+": "+project.lat+", "+project.lng+", "+project.offset+", "+project.name)});
	
	//create a legend
	var legend = document.getElementById('legend');
	
	//get google maps icons
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var sImage = {
          url: 'SUNFARMING.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(45, 45),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(-6, -16),
          // The anchor for this image is the center of circle at (0, 15).
          anchor: new google.maps.Point(10,10),
          //scale it
          scaledSize: new google.maps.Size(30, 30)
        };

	//show Info Window or Marker at every project
	var labelType="marker";
	uonProjects.forEach(function(project){
		if(labelType=="marker"){//show marker type
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(project.lat, project.lng),
				icon: sImage,
				label: {
					text: project.index.toString(),
					color: 'blue',
					fontSize: "14px"
				},
				map: map
		    });
		    var div = document.createElement('div');
		    var icon = sImage
			div.innerHTML = '<img class="logo" src="SUNFARMING.png"/><span class=icontext> ' + project.index.toString()+'</span><span class="right"> '+ project.name+'</span>';
			legend.appendChild(div);
		}else{//show infobox type
			var sOptions = {
				 content: project.name
				,boxStyle: {
				   border: "1px solid blue"
				  ,textAlign: "center"
				  ,fontSize: "10pt"
				  ,width: "auto"
				  ,color:"orange"
				  ,background:"#87cefa"
				 }
				,disableAutoPan: false
				,pixelOffset: new google.maps.Size(project.offset[0], project.offset[1])
				,position: new google.maps.LatLng(project.lat, project.lng)
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			var sLabel = new InfoBox(sOptions);
			sLabel.open(map);
		}
	});
	//Add text to bottom of legend
	var div = document.createElement('div');
	div.innerHTML = '<div class="bottom">Total capcity: 161MW<br/>161,000 jobs in 10 years<br/>500 franchize jobs</span>';
	legend.appendChild(div);
	
	//show legend
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);
}
