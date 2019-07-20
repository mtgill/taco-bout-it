import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import locationData from '../../helpers/data/locationData';
import tacoData from '../../helpers/data/tacoData';

import TacoPopup from '../TacoPopup/TacoPopup';


import './TacoMap.scss';


class TacoMap extends React.Component {
  state = {
    lat: 36.1627,
    lng: -86.7816,
    zoom: 12,
    locations: [],
    tacos: [],
  }

  getTacos = () => {
    tacoData.getTacos()
      .then(tacos => this.setState({ tacos }))
      .catch(err => console.error('could not get locations', err));
  }

  getLocations = () => {
    locationData.getLocations()
      .then(locations => this.setState({ locations }))
      .catch(err => console.error('could not get locations', err));
  }

  componentDidMount() {
    this.getLocations();
    this.getTacos();
  }

  render() {
    const { zoom, locations, tacos } = this.state;
    const center = [this.state.lat, this.state.lng];
    const makeMarkers = this.state.locations.map(location => (
      <Marker key={location.id} position={[location.lat, location.lng]}>
        <Popup>
          {location.name}
        </Popup>
      </Marker>
    ));
    return (
      <div className="TacoMap">
      <Map center={center} zoom={zoom}>
         <TileLayer
          attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {makeMarkers}
      </Map>
      <TacoPopup tacos={tacos} locations={locations} />
      </div>
    );
  }
}

export default TacoMap;
