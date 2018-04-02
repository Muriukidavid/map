function initMap(){
			//center of map
			var masinga = new google.maps.LatLng(-0.8582151, 37.5695515);//(-0.8584893, 37.5555182);
			var posA = new google.maps.LatLng(-0.85349, 37.5415);
			var posB = new google.maps.LatLng(-0.86036, 37.55695);
			//create our map
			var map = new google.maps.Map(document.getElementById('map'), { 
				center: masinga, 
				zoom: 15, 
				mapTypeId: google.maps.MapTypeId.HYBRID
			});
			
			//show farm office
			var myOptions = {
				 content: "Farm Office"
				,boxStyle: {
				   border: "1px solid white"
				  ,textAlign: "center"
				  ,fontSize: "8pt"
				  ,width: "50px"
				  ,color:"white"
				  ,background:"black"
				 }
				,disableAutoPan: true
				,pixelOffset: new google.maps.Size(-25, 0)
				,position: new google.maps.LatLng(-0.86505, 37.56072)
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			var ibLabel = new InfoBox(myOptions);
			ibLabel.open(map);
			//define blockA by coordinates
			var blockA = [
				{lat: -0.852752, lng: 37.546884},
				{lat: -0.853841, lng: 37.545049},
				{lat: -0.855214, lng: 37.543826},
				{lat: -0.855782, lng: 37.543912},
				{lat: -0.856576, lng: 37.54182},
				{lat: -0.860578, lng: 37.545349},
				{lat: -0.8586073, lng: 37.546066},
				{lat: -0.857617, lng: 37.545478},
				{lat: -0.856372, lng: 37.547088},
				{lat: -0.8560944, lng: 37.546868},
				{lat: -0.8553891, lng: 37.548126},
				{lat: -0.8559362, lng: 37.5488394},
				{lat: -0.857316, lng: 37.549502},
				{lat: -0.858003, lng: 37.551261},
				{lat: -0.8553, lng: 37.55035},
				{lat: -0.853036, lng: 37.550735},
				{lat: -0.852752, lng: 37.546884}
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
			var blockAarea = (z/10000).toFixed(1)+"ha";
  			//show Info Window at the blockA
			var blockAOptions = {
				 content: "Block A<br> Total area: "+blockAarea
				,boxStyle: {
				   border: "1px solid white"
				  ,textAlign: "center"
				  ,fontSize: "8pt"
				  ,width: "auto"
				  ,color:"black"
				  ,background:"white"
				 }
				,disableAutoPan: true
				,pixelOffset: new google.maps.Size(-25, 0)
				,position: posA
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			var blockALabel = new InfoBox(blockAOptions);
			blockALabel.open(map);
			
			//define bockB coordinates
			var blockB = [
				{lat: -0.85816, lng: 37.55126},
				{lat: -0.86201, lng: 37.54938},
				{lat: -0.87444, lng: 37.55128},
				{lat: -0.87391, lng: 37.55391},
				{lat: -0.8711, lng: 37.55402},
				{lat: -0.86892, lng: 37.55453},
				{lat: -0.86499, lng: 37.55555},
				{lat: -0.86228, lng: 37.55645},
				{lat: -0.86126, lng: 37.55458},
				{lat: -0.85991, lng: 37.55403},
				{lat: -0.85816, lng: 37.55126}
			];
			//create a polygon for blockB
			var sectB = new google.maps.Polygon({
				paths: blockB,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0000FF',
				fillOpacity: 0.35
			});
			//overlay blockB polygon
			sectB.setMap(map);
			//calculate area of blockB
			z = google.maps.geometry.spherical.computeArea(sectB.getPath());
			var blockBarea = (z/10000).toFixed(1)+"ha";
			//show info window at blockB
			var blockBOptions = {
				 content: "Block B<br> Total area: "+blockBarea
				,boxStyle: {
				   border: "1px solid white"
				  ,textAlign: "center"
				  ,fontSize: "8pt"
				  ,width: "auto"
				  ,color:"black"
				  ,background:"white"
				 }
				,disableAutoPan: true
				,pixelOffset: new google.maps.Size(-25, 0)
				,position: posB
				,closeBoxURL: ""
				,isHidden: false
				,pane: "mapPane"
				,enableEventPropagation: true
			};
			var blockBLabel = new InfoBox(blockBOptions);
			blockBLabel.open(map);
			//feed in pointA
			var feedinpointa = new google.maps.LatLng(-0.8459, 37.54995);
			var markerFIPA = new google.maps.Marker({
				position:feedinpointa
			});
			markerFIPA.setMap(map);
			var infowindowFIPA = new google.maps.InfoWindow({
				content: "Feed in point for blockA"
			});
			infowindowFIPA.open(map,markerFIPA);
			//draw line from feed in point to blockA
			var begin = new google.maps.LatLng(-0.8459, 37.54995);
			var end = new google.maps.LatLng(-0.8529485, 37.5495583);
			var pathendsA = [begin,end];
			var pathA = new google.maps.Polyline({
				path:pathendsA,
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 4
			});
			pathA.setMap(map);
			//Label for line length
			//-0.8486843, 37.5500894
			length=google.maps.geometry.spherical.computeDistanceBetween(begin,end);
			console.log(length);
			//var lineOptions =  
			//feed in pointB
			var feedinpointb = new google.maps.LatLng(-0.8471609, 37.556119);
			var markerFIPB = new google.maps.Marker({
				position:feedinpointb
			});
			markerFIPB.setMap(map);
			var infowindowFIPB = new google.maps.InfoWindow({
				content: "Feed in point for blockB"
			});
			infowindowFIPB.open(map,markerFIPB);
			//draw line from feed in point to blockB
			var begin = new google.maps.LatLng(-0.8471609, 37.556119);
			var end = new google.maps.LatLng(-0.85991, 37.55403);
			var pathendsB = [begin,end];
			var pathB = new google.maps.Polyline({
				path:pathendsB,
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 4
			});
			pathB.setMap(map);
			length2=google.maps.geometry.spherical.computeDistanceBetween(begin,end);
			console.log(length2);
			//show grid
		}
