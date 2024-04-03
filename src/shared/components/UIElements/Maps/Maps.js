import React, { useRef, useEffect} from 'react'

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj.js';
import './Map.css'
const Maps = (props) => {
  console.log(props);
  const mapRef = useRef();
  const { center, zoom} = props;
  useEffect(() => {
    new Map({
      target : mapRef.current.id,
      layers : [
        new TileLayer({
          source : new OSM()
        })
      ],
      view : new View({
        center : fromLonLat([
          center.long,
          center.lat
        ]),
        zoom : zoom
      })
    });
}, [center, zoom]);
  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style} id="map">Maps</div>
  )
}

export default Maps