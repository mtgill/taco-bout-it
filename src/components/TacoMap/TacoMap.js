import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import locationData from '../../helpers/data/locationData';


import './TacoMap.scss';


class TacoMap extends React.Component {
  state = {
    lat: 36.1627,
    lng: -86.7816,
    zoom: 12,
    locations: [],
    markerLat: 0,
    markerLng: 0,
  }

  getLocations = () => {
    locationData.getLocations()
      .then(locations => this.setState({ locations }))
      .catch(err => console.error('could not get locations', err));
  }

  componentDidMount() {
    this.getLocations();
  }

  render() {
    const { zoom } = this.state;
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
      </div>
    );
  }
}

export default TacoMap;
