function extrapolate(p1,p2,lon){
 var ydiff = p2.lat()-p1.lat();
 var xdiff = p2.lng()-p1.lng();
 var m=ydiff/xdiff;
 var c = p1.lat()-m*p1.lng();
 var latnew = m*lon+c;
 //console.log("ydiff "+ ydiff);
 //console.log("xdiff "+ xdiff);
 //console.log("grad "+ m);
 //console.log("C: "+c);
 return latnew;
}
