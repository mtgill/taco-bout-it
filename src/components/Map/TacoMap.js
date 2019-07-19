import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import './TacoMap.scss';


class TacoMap extends React.Component {
  state = {
    lat: 36.1627,
    lng: -86.7816,
    zoom: 12,
  }

  render() {
    const { zoom } = this.state;
    const center = [this.state.lat, this.state.lng];
    return (
      <div className="TacoMap">
      <Map center={center} zoom={zoom}>
         <TileLayer
          attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      </div>
    );
  }
}

export default TacoMap;
