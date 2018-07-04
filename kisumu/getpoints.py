from fastkml import kml

#open file for reading
kml_file_name = "seme_data.ods.kml"
with open(kml_file_name, 'rt') as myfile:
	doc=myfile.read()
	myfile.close()
	
#create a kml object	
k = kml.KML()

#read kml as a string from the document
k.from_string(doc)

#extract features from the kml structure
features = list(k.features())

#get the document object
document = features[0]

#extract document metadata and styles
name = document.name
description = document.description
styleUrl = document.styleUrl
styles = document._styles
print "Processing :" + name + "\n"+"\t"+description;

#extract the feature entries from the document
features = list(document.features())

#create an output file, open for writing
output_file_name = "coordinates.txt"
text_file = open(output_file_name, "w")

#create an output string, open a javascript object
name = name.replace(" ","_")
output = "var "+name+" = [\n\t"

#keep track of the points, the last one needs to be handled differently
points = len(features)
i=0

#loop through all features and extract the coordinates from placemarks
for feature in features:
	#only process placemark features
	if isinstance(feature,kml.Placemark):
		data = feature.geometry
		latitude = data.y
		longitude = data.x
		altitude =  data.z
		if i >= (points-1): #if last point, don't put a comma and tab
			output += "{ lat: "+str(latitude)+", lng:"+str(longitude)+"}\n"
		else: 
			output += "{ lat: "+str(latitude)+", lng:"+str(longitude)+"},\n\t"
	i += 1 #increment our tracker
	
#close the javascript object	
output += "];"

#write to the output file and close
text_file.write(output)
text_file.close()
print "Data written in a file named: " + output_file_name
