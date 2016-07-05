/*
* function drawGrid(polygon,side,pad,map);
* A function to draw a grid on a map ontop of a polygon
*
* Parameters: 
* 	polygon: The vector of {lat,lng} obects that define a polygon. The last entry must be the same as the the last
* 	side: 	The width/height of the grid - square grid
*/
function drawGrid(polygon,side,pad,map){
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
	Number.prototype.toDeg = function() {
		return this * 180 / Math.PI;
	}
	google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
		dist = dist / 6371;  
		brng = brng.toRad();  

		var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

		var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
		                    Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

		var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
		                            Math.cos(lat1), 
		                            Math.cos(dist) - Math.sin(lat1) *
		                            Math.sin(lat2));

		if (isNaN(lat2) || isNaN(lon2)) return null;
		return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
	}
	//Rectangular bounds for our polygon, autocomputed
	var northcoord = Math.max.apply(Math,polygon.map(function(o){return o.lat;}));
	var southcoord = Math.min.apply(Math,polygon.map(function(o){return o.lat;}));
	//var eastcoord = Math.max.apply(Math,polygon.map(function(o){return Math.abs(o.lng);})); //no idea why abs was used
	//var westcoord = Math.min.apply(Math,polygon.map(function(o){return Math.abs(o.lng);})); //no idea why abs was used
	var eastcoord = Math.max.apply(Math,polygon.map(function(o){return o.lng;}));
	var westcoord = Math.min.apply(Math,polygon.map(function(o){return o.lng;}));
	var bounds = {north: northcoord, south: southcoord, east: eastcoord, west: westcoord};
	//console.log("north: "+bounds.north+", south: "+bounds.south+", east: "+bounds.east+", west: "+bounds.west);
	//get the four corners of region
	var possw = new google.maps.LatLng(bounds.south, bounds.west);//south west of corner
	var posse = new google.maps.LatLng(bounds.south, bounds.east);//south east of corner
	var posnw = new google.maps.LatLng(bounds.north, bounds.west);//north west or corner
	var posne = new google.maps.LatLng(bounds.north, bounds.east);//north east of corner

	//show the bounding box
	var bb = [
		{lat: possw.lat(), lng: possw.lng()},
		{lat: posse.lat(), lng: posse.lng()},
		{lat: posne.lat(), lng: posne.lng()},
		{lat: posnw.lat(), lng: posnw.lng()}
	];
	//console.log(bb);
	var sectbb = new google.maps.Polygon({
		paths: bb,
		strokeColor: '#00FF00',
		strokeOpacity: 0.9,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.1
	});
	sectbb.setMap(map);

	//calculate height and width of bounded region
	var height = google.maps.geometry.spherical.computeDistanceBetween(posnw, possw);
	var width = google.maps.geometry.spherical.computeDistanceBetween(posnw,posne);
	//console.log("height: "+height);
	var hcount = 0;// keep track of lines
	var vcount = 0;
	var nxtsw = possw;
	//	var posse = posse.destinationPoint(90,pad/1000);//adjust width for remaining squares outside region
	//	var posnw = posnw.destinationPoint(0,pad/1000);//adjust height for remaining squares outside region
	
	//draw the lines
	while(hcount*side<height){
		nxtsw = possw.destinationPoint(0,side*hcount/1000);
		nxtse = posse.destinationPoint(0,side*hcount/1000);
		hlinecoords = [nxtsw,nxtse];
		hline = new google.maps.Polyline({path:hlinecoords,strokeColor: '#000000', strokeOpacity: 0.4, strokeWeight: 1});
		hline.setMap(map);
		hcount=hcount+1;
		
	}
	while(vcount*side<width){
		nxtnw = posnw.destinationPoint(90,side*vcount/1000);
		nxtnsw = possw.destinationPoint(90,side*vcount/1000);
		vline = new google.maps.Polyline({path: [nxtnw, nxtnsw], strokeColor: '#000000', strokeOpacity: 0.4, strokeWeight: 1});
		vline.setMap(map);
		vcount = vcount+1;
	}	
}
