import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";

import devices from "./devices.json";

export default function Map() {
  const map = useRef(null);

  // Initialize and display Map upon signing-in
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken =
      "pk.eyJ1Ijoibmlja3RoaXJ1IiwiYSI6ImNsZnR6eTRrYjAxbm0zZXZ5azVhZmg5aHcifQ.oc47G5fIrxSukPN9IVaGbA";

    map.current = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/light-v11",
      center: [18.0956097, -33.9142688], // [lng, lat]
      zoom: 11,
    }).addControl(
      new mapboxgl.NavigationControl({
        showZoom: true,
      })
    );

    map.current.on("load", () => {
      // Fetch GeoJson file from S3 via API Gateway
      // Convert to JS Object

      map.current.addSource("devices", devices);

      map.current.addLayer({
        id: "devices",
        type: "circle",
        source: "devices",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    });

    map.current.on("mouseenter", "devices", (e) => {
      map.current.getCanvas().style.cursor = "pointer";

      const deviceId = e.features[0].properties.deviceId;

      displayDeviceData(deviceId);

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
    });

    map.current.on("mouseleave", "devices", () => {
      map.current.getCanvas().style.cursor = "";

      clearDeviceData();
    });
  });

  function displayDeviceData(deviceId) {
    // Display device details in pane
    const waterTempDisplay = document.getElementById("waterTemp");
    waterTempDisplay.textContent = "test";
  }

  function clearDeviceData() {
    // Clear device details in pane
  }

  return (
    <div className="map-feature">
      <div className="device-details">
        <div>
          <strong></strong> <span id="waterTemp"></span>
        </div>
      </div>
      <div id="mapbox"></div>
    </div>
  );
}
