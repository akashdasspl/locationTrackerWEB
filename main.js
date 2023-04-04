import "./style.css";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector.js";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { db } from "./config";
import { ref, onValue, query, orderByChild } from "firebase/database";
import LayerGroup from "ol/layer/Group";
import { MultiPoint } from "ol/geom";

var data;
const starCountRef = ref(db, "users/");
var entries

 
onValue(starCountRef, (snapshot) => {
  
  const data1 = snapshot.val();
  console.log("DATA : ", data1);
  data = data1;
  


 
  entries = Object.entries(data1);
 entries.sort((a, b) => {
   return a[1].time - b[1].time;
 });
 console.log(entries); 

 
 var color = ["blue", "purple", "red", "yellow"];
 var index = 0;
var textcolor
let text = "<div class=cardd>";
for (let i = 1; i < entries.length; i++) {

 if (color[index] == "blue" || color[index] == "purple") {
   textcolor = "white";
 }else{
  textcolor = "black";
 }
 

   let p = entries[i][1].previousDATA.length
   console.log(p)

  text +=
    ` <div class=cardbox style=background-color:${color[index]}  > ` +
    `<p style = color:${textcolor}><strong>Device Name:</strong>` +
    entries[i][1].Dname +
    "</p>" +
    `<p style = color:${textcolor} ><strong>IP Address:</strong>` +
    entries[i][1].ip +
    "</p>" +
    `<p style = color:${textcolor}><strong>longitude:</strong>` +
    entries[i][1].longitude +
    "</p>" +
    `<p style = color:${textcolor}><strong>latitude:</strong>` +
    entries[i][1].latitude +
    "</p>" +
    `<p style = color:${textcolor}><strong>previous latitude:</strong>` +
    entries[i][1].previousDATA[p - 1].latitude +
    "</p>" +
    `<p style = color:${textcolor}><strong>previous longitude:</strong>` +
    entries[i][1].previousDATA[p - 1].longitude +
    "</p>" +
    `<p style = color:${textcolor}><strong>time:</strong>` +
    entries[i][1].Currenttime +
    "</p>" +
    "</div>";

  
  
  
  
 index = (index + 1) % 4;
}
text += "</div>";

document.getElementById("demo").innerHTML = text;
 

});


 


console.log("gfgfg", data);
setTimeout(() => {
  console.log("gfgfgset", data);
  const fdsa = data;
  console.log("fdsa", fdsa);
  setTimeout(() => {
    var allLocation = [];
    var colors = ["blue", "purple", "red", "yellow"];
    var index = 0;

    const tileLayer = new TileLayer({
      source: new OSM(),
    });

     
var markerFeature;

 for (let i = 1; i < entries.length; i++) {
   var markerppoint = new Point(
     fromLonLat([entries[i][1].longitude, entries[i][1].latitude])
   );
   markerFeature = new Feature({
     geometry: markerppoint,
   });
   var vectorLayer = new VectorLayer({
     source: new VectorSource({
       features: [markerFeature],
     }),
     style: new Style({
       image: new Icon({
         src: `./assets/placeholder_${colors[index]}.png`,
         scale: 0.05,
       }),
     }),
   });

   allLocation.push(vectorLayer);

   index = (index + 1) % 4;
 }
const tileLayerGroup = new LayerGroup({
          title: "Year Comparison",
          layers: allLocation,
        })
    const map = new Map({
      target: "map",
      layers: [tileLayer, tileLayerGroup],
      view: new View({
        center: fromLonLat([
          entries[entries.length - 1][1].longitude,
          entries[entries.length - 1][1].latitude,
        ]),
        zoom: 7,
      }),
    });

 
function agg(){
     
  
for (let i = 1; i < entries.length; i++) {
 
  markerFeature.setGeometry(
    new Point(fromLonLat([entries[i][1].longitude, entries[i][1].latitude]))
  );
 
} vectorLayer.changed();
}
    
      
           window.setInterval(() => {
     
     
 agg()
     }, 2000);
  
   }, 2000);
}, 2000);
