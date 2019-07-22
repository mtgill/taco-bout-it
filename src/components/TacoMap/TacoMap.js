import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';

import TacoPopup from '../TacoPopup/TacoPopup';


import './TacoMap.scss';
import tacoData from '../../helpers/data/tacoData';


class TacoMap extends React.Component {
  state = {
    lat: 36.1627,
    lng: -86.7816,
    zoom: 12,
    locationTacos: [],
  }

  selectLocation = (e) => {
    const locationId = e.target.options.id;
    const matchTacos = this.props.tacos.filter(x => x.locationId === locationId);
    this.setState({ locationTacos: matchTacos });
  }

  getSingleTaco = (tacoId) => {
    tacoData.getSingleTaco(tacoId);
  }

  render() {
    const { zoom, locationTacos } = this.state;
    const center = [this.state.lat, this.state.lng];
    const makeMarkers = this.props.locations.map(location => (
      <Marker
      key={location.name}
      id={location.id}
      position={[location.lat, location.lng]}
      onClick={this.selectLocation}>
        <TacoPopup
        key={location.id}
        locationTacos={locationTacos}
        locationName={location.name}
        getSingleTaco={this.getSingleTaco}
        />
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
