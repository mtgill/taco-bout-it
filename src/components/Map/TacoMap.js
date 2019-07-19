import React from 'react';

import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import './TacoMap.scss';


class TacoMap extends React.Component {
  state = {
    center: [36.1627, -86.7816],
    zoom: 12,
  }

  render() {
    const { center, zoom } = this.state;
    return (
      <div className="TacoMap">
      <LeafletMap center={center} zoom={zoom}>
         <TileLayer
          attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
      </div>
    );
  }
}

export default TacoMap;
