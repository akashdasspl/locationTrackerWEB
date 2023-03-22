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
import { ref, onValue, get, child } from "firebase/database";
import LayerGroup from "ol/layer/Group";
const starCountRef = ref(db, "users");
onValue(starCountRef, (snapshot) => {
  window.setInterval(() => {
    const data = snapshot.val();
    console.log("DATA : ", data);

    var allLocation = [];
    var colors = ["blue", "purple", "red", "yellow"];
    var index = 0;
    for (var location in data) {
      allLocation.push(
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(
                  fromLonLat([
                    data[location].longitude,
                    data[location].latitude,
                  ])
                ),
              }),
            ],
          }),
          style: new Style({
            image: new Icon({
              src: `./assets/placeholder_${colors[index]}.png`,
              scale: 0.05,
            }),
          }),
        })
      );
      index = (index + 1) % 4;
    }

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new LayerGroup({
          title: "Year Comparison",
          layers: allLocation,
        }),
      ],
      view: new View({
        center: fromLonLat([data[location].longitude, data[location].latitude]),
        zoom: 7,
      }),
    });

    for (var location in data) {
      var overlay = new Overlay({
        position: fromLonLat([
          data[location].longitude,
          data[location].latitude,
        ]),
        positioning: "bottom-center",
        element: document.createElement("div"),
        stopEvent: false,
      });

      overlay.getElement().innerHTML = `<div class="card">
 
  <div class="card-body" >
   <div class="card-header">
    Device Info
  </div>
    <p><strong>Device Name:</strong>${data[location].Dname}</p>
    <p><strong>IP Address:</strong>${data[location].ip}</p>
    <p><strong>longitude:</strong>${data[location].longitude}</p>
    <p><strong>latitude:</strong>${data[location].latitude}</p>
 
  </div>
</div>`;

      overlay.getElement().style.fontSize = "16px";
      map.addOverlay(overlay);
      index = (index + 1) % 4;
      console.log(location)
    }
  }, 5000);
   
});
