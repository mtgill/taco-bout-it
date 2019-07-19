import React from 'react';

import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';

import './TacoMap.scss';


class TacoMap extends React.Component {
  state = {
    center: [36.1627, 86.7816],
    zoom: 13,
  }

  render() {
    const { center, zoom } = this.state;
    return (
      <div className="TacoMap">
      <Map>
        <TileLayer
          attribution='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
      </div>
    );
  }
}

export default TacoMap;
