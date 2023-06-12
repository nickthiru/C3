import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";

import devices from "./devices";
import WebSocketConnection from "../utils/WebSocketConnection";

export default function Map() {
  const map = useRef(null);

  // Initialize and display Map upon signing-in
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    mapboxgl.accessToken =
      "pk.eyJ1Ijoibmlja3RoaXJ1IiwiYSI6ImNsZnR6eTRrYjAxbm0zZXZ5azVhZmg5aHcifQ.oc47G5fIrxSukPN9IVaGbA";

    map.current = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-77.04, 38.907], // [lng, lat]
      zoom: 11.15,
    }).addControl(
      new mapboxgl.NavigationControl({
        showZoom: true,
      })
    );

    map.current.on("load", () => {
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

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.current.on("mouseenter", "devices", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
      });

      map.current.on("mouseleave", "devices", () => {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
      });
    });
  });

  function handleOnMessage(event) {
    console.log("handleOnMessage called");
    console.log("(+) Value of event.data: ", event.data);
    console.log(
      "(+) Value of JSON.parse(event.data): ",
      JSON.parse(event.data)
    );

    const data = JSON.parse(event.data);

    /*
    If the device doesn't exist in the 'source', then add it and display it on the map
      by calling 'map.getSource().setData(data)'
    */

    /* I don't think this will work. setFeatureState() doesn't update the GeoJson 'source'.
    // Call 'map.setFeatureState(feature, state) and update the feature using the 'deviceId'
    map.current.setFeature(
      {
        source: "devices",
        id: "smartStud2",
      },
      {
        properties: {
          deviceType: "smartStud",
          description: `
                    <p>X: ${data.x}</p>
                    <p>Y: ${data.y}</p>
                    <p>Z: ${data.z}</p>
                  `,
        },
        geometry: {
          type: "Point",
          coordinates: [-77.003168, 38.894651],
        },
      }
    );
    */

    // map.current.getSource("devices").setData({
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       id: "smartStud2",
    //       type: "Feature",
    //       properties: {
    //         deviceType: "smartStud",
    //         description: `
    //           <p>X: ${data.x}</p>
    //           <p>Y: ${data.y}</p>
    //           <p>Z: ${data.z}</p>
    //         `,
    //       },
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-77.003168, 38.894651],
    //       },
    //     },
    //   ],
    // });
  }

  return (
    <>
      <WebSocketConnection onMessage={handleOnMessage} />
      <div id="map-container"></div>
    </>
  );
}
