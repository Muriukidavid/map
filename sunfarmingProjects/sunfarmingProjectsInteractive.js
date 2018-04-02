function initMap(){
	//global variables
	//var sOptions = null;
	var sLabel = null;
	var mapCenter = new google.maps.LatLng(0.491621, 37.904205);
	var sfProjects = [
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
	
	//create a legend
	var legend = document.getElementById('legend');
	
	//create an icon for the legend
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

	// add a marker and lengend entry for each project
	sfProjects.forEach(function(project){
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
	    
		//Events
		google.maps.event.addListener(marker, 'click', function() {
			var idx = parseInt(this.label.text);
			//console.log(idx);
			var proj = sfProjects[idx-1];
			//console.log(proj.name);
			if (sLabel) {
				sLabel.close();
			}
			/*var sOptions = {
				 content: proj.name
				,boxStyle: {
				   border: "1px solid blue"
				  ,textAlign: "center"
				  ,fontSize: "12pt"
				  ,width: "150px"
				  ,color: "black"
				  ,background: "#d3d7cf"
				 }
				,disableAutoPan: false
				,pixelOffset: new google.maps.Size(proj.offset[0], proj.offset[1])
				,position: new google.maps.LatLng(proj.lat, proj.lng)
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			sLabel = new InfoBox(sOptions);*/
			sLabel = new google.maps.InfoWindow({
		      content: proj.name
		      ,position: new google.maps.LatLng(proj.lat, proj.lng)
		    });
			sLabel.open(map);
			//setTimeout(function () { sLabel.close(); }, 5000);
		});
	    
	    var div = document.createElement('div');
	    //var icon = sImage
		div.innerHTML = '<img class="logo" src="SUNFARMING.png"/><span class=icontext> ' + project.index.toString()+'</span><span class="right"> '+ project.name+'</span>';
		legend.appendChild(div);
	});
	
	//Add text to bottom of legend
	var div = document.createElement('div');
	div.innerHTML = '<div class="bottom">Total capcity: 161MW<br/>161,000 jobs in 10 years<br/>500 franchize jobs</span>';
	legend.appendChild(div);
	
	//show legend
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);
}
