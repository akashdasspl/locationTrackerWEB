import "./style.css";
import { Map, View } from "ol";
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
                fromLonLat([data[location].longitude, data[location].latitude])
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
      center: fromLonLat([data["akash"].longitude, data["akash"].latitude]),
      zoom: 7,
    }),
  });
});
