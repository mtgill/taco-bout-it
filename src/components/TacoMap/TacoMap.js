import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';

import PropTypes from 'prop-types';

import Control from 'react-leaflet-control';

import TacoPopup from '../TacoPopup/TacoPopup';


import './TacoMap.scss';
import tacoData from '../../helpers/data/tacoData';
import reviewData from '../../helpers/data/reviewData';

class TacoMap extends React.Component {
  static propTypes = {
    tacos: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    modalToggle: PropTypes.func.isRequired,
  }

  state = {
    lat: 36.1627,
    lng: -86.7816,
    zoom: 12,
    locationTacos: [],
    locationId: '',
    allReviews: [],
  }


  componentDidMount() {
    const { allReviews } = this.state;
    reviewData.getAllReviews()
      .then((reviews) => {
        reviews.forEach((review) => {
          allReviews.push(review);
        });
      });
  }

  selectLocation = (e) => {
    const locationId = e.target.options.id;
    const matchTacos = this.props.tacos.filter(x => x.locationId === locationId);
    this.setState({ locationTacos: matchTacos });
  }

  getSingleTaco = (tacoId) => {
    tacoData.getSingleTaco(tacoId);
  }

  addTaco = (locationId) => {
    this.setState({ locationId });
  }

  saveNewTaco = (locationId) => {
    tacoData.getTacos()
      .then((tacos) => {
        const matchTacos = tacos.filter(x => x.locationId === locationId);
        this.setState({ locationTacos: matchTacos });
      });
  }

  render() {
    const { zoom, locationTacos, allReviews } = this.state;
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
        locationId={location.id}
        getSingleTaco={this.getSingleTaco}
        newTacoModalToggle={this.newTacoModalToggle}
        addTaco={this.addTaco}
        allReviews={allReviews}
        saveNewTaco={this.saveNewTaco}
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

        <Control position="topleft">
          <button className="btn btn-info" onClick={this.props.modalToggle}>Add Location</button>
        </Control>

      </Map>
      </div>
    );
  }
}

export default TacoMap;
