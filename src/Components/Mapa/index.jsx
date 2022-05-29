/* eslint-disable */
import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./index.css";
import { getDados } from "../../Api/googleapi.js";
import {PositionContext} from '../../App.jsx'
require("dotenv").config();
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

mapboxgl.accessToken = MAPBOX_TOKEN;
export default function Mapa(props) {
  const setPos = useContext(PositionContext).setPos
  const mapContainer = useRef(null);
  var map;
  const [lng, setLng] = useState(-45.48590095909857);
  const [lat, setLat] = useState(-22.07313024696883);
  const [zoom, setZoom] = useState(4);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    // Add the control to the map.
    map.addControl(geolocate);
    map.on("load", () => {
      geolocate.trigger();
    });
    map.on("click", (e) => {
      const coords = e.lngLat.wrap();
      setPos({lat:coords.lat, lon:coords.lng});
      getDados(`geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_KEY}`, (dados) => {
        if(dados.status == 'OK')
        props.setLocation(dados.plus_code.compound_code.split(' ').splice(1).join(" "))
      });
    });
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
