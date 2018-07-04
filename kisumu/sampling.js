function initMap(){
	var Acenter = new google.maps.LatLng(-0.135773, 34.582603); 
	var posA = new google.maps.LatLng(-0.130503, 34.583709);
	var air1latlng = new google.maps.LatLng(-0.131260, 34.579277);
	//Air and soil sample point 1
	var air_point1 = new google.maps.LatLng(-0.13052, 34.58467);
	var markerair1 = new google.maps.Marker({
		position:air_point1,
		title: "LatLng(-0.13052, 34.58467)"
	});
	//Air and soil sample point 2
	var air_point2 = new google.maps.LatLng(-0.12795, 34.58527);
	var markerair2 = new google.maps.Marker({
		position:air_point2,
		title: "LatLng(-0.12795, 34.58527)"
	});
	//lake water sample point
	var lake_point = new google.maps.LatLng(-0.14369, 34.57798);
	var markerlake = new google.maps.Marker({
		position:lake_point,
		title: "LatLng(-0.14369, 34.57798)"
	});
	
	//create our map
	var map = new google.maps.Map(document.getElementById('map'), { 
		center: Acenter, //define center of map 
		zoom: 15, //Zoom to fit map to screen
		mapTypeId: google.maps.MapTypeId.HYBRID
	});
	
	//infoWindow for lake sample point
	markerlake.setMap(map);
	var infowindowLAKE = new google.maps.InfoWindow({
		content: "Water sample location<br>lat: -0.14369, lng: 34.57798"
	});
	infowindowLAKE.open(map,markerlake);
	//air and soil sample 1 infoWindow
	markerair1.setMap(map);
	var infowindowAIR1 = new google.maps.InfoWindow({
		content: "Air, Noise and Soil sample point 1<br> lat: -0.13052, lng: 34.58467"
	});
	infowindowAIR1.open(map,markerair1);
	infowindowAIR1.setPosition(air1latlng);
	//air and soil sample 2 infoWindow
	markerair2.setMap(map);
	var infowindowAIR2 = new google.maps.InfoWindow({
		content: "Air, Noise and Soil sample point 2<br> lat: -0.12795, lng: 34.58527"
	});
	infowindowAIR2.open(map,markerair2);
}
