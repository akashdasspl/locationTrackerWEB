import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from "ol/layer/Vector.js";
import OSM from 'ol/source/OSM';
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { db } from './config';
import { getDatabase, ref, set, onValue } from "firebase/database";

 var username = "akash";
 var latitude;
 var longitude;
 const starCountRef = ref(db, "users/" + username);
 onValue(starCountRef, (snapshot) => {
   const data = snapshot.val();

   longitude = data.longitude;
    
   latitude = data.latitude;
   
   const map = new Map({
   target: "map",
   layers: [
      new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([longitude, latitude])),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: "./assets/placeholder.png",
          scale: 0.05,
        }),
      }),
    }),
  ],
  view: new View({
    center: fromLonLat([longitude, latitude]),
    zoom: 14,
  }),
 })
}) 