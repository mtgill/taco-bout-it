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
    locationTacos: [],
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

  selectLocation = (e) => {
    const locationId = e.target.options.id;
    const matchTacos = this.state.tacos.filter(x => x.locationId === locationId);
    this.setState({ locationTacos: matchTacos });
    console.error(this.state.locationTacos);
  }

  // chooseLocation = (e) => {
  //   const { locations } = this.state;
  //   this.selectLocation(locations.id);
  //   console.error(locations.id);
  // }

  render() {
    const { zoom, locationTacos } = this.state;
    const center = [this.state.lat, this.state.lng];
    const makeMarkers = this.state.locations.map(location => (
      <Marker
      key={location.name}
      id={location.id}
      position={[location.lat, location.lng]}
      onClick={this.selectLocation}>
        <Popup>
        <TacoPopup locationTacos={locationTacos} />
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
      </div>
    );
  }
}

export default TacoMap;
