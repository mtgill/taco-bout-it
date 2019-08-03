/* eslint-disable global-require */
import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';

import L from 'leaflet';

import PropTypes from 'prop-types';

import Control from 'react-leaflet-control';

import TacoPopup from '../TacoPopup/TacoPopup';


import './TacoMap.scss';
import tacoData from '../../helpers/data/tacoData';
import reviewData from '../../helpers/data/reviewData';
import locationData from '../../helpers/data/locationData';

// custom taco marker icon
const tacoIcon = L.icon({
  iconUrl: 'https://image.flaticon.com/icons/svg/135/135590.svg',
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),

  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [2, 40],
  shadowAnchor: [10, 45],
  popupAnchor: [20, -30],
});

// default leaflet marker icon
const defaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),

  iconSize: [25, 50],
  shadowSize: [50, 64],
  iconAnchor: [2, 40],
  shadowAnchor: [10, 45],
  popupAnchor: [20, -30],
});

class TacoMap extends React.Component {
  static propTypes = {
    tacos: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    modalToggle: PropTypes.func.isRequired,
  }

  state = {
    lat: 36.1627,
    lng: -86.7824,
    zoom: 12.3,
    locationTacos: [],
    locationId: '',
    allReviews: [],
    tacoMarkerIcon: false,
    deleted: false,
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

  // executes when a user clicks on a location marker
  // finds tacos for each location
  selectLocation = (e) => {
    const locationId = e.target.options.id;
    const matchTacos = this.props.tacos.filter(x => x.locationId === locationId);
    this.setState({ locationTacos: matchTacos });
  }

  // returns a single taco object using the id
  getSingleTaco = (tacoId) => {
    tacoData.getSingleTaco(tacoId);
  }

  // adds a new taco to a location
  addTaco = (locationId) => {
    this.setState({ locationId });
  }

  // toggles back and forth between default marker icon and custom icon
  changeMarkerIcon = () => {
    const { tacoMarkerIcon } = this.state;
    if (!tacoMarkerIcon) {
      this.setState({ tacoMarkerIcon: true });
    } else if (tacoMarkerIcon) {
      this.setState({ tacoMarkerIcon: false });
    }
  }

  // saves new taco to fb
  saveNewTaco = (locationId) => {
    tacoData.getTacos()
      .then((tacos) => {
        const matchTacos = tacos.filter(x => x.locationId === locationId);
        this.setState({ locationTacos: matchTacos });
      });
  }

  // deletes location based on ID
  deleteLocation = (locationId) => {
    const { getLocations, getZomatoLocations } = this.props;
    locationData.deleteLocation(locationId)
      .then(() => {
        getLocations();
        getZomatoLocations();
        this.setState({ deleted: true });
      })
      .catch(err => console.error('unable to delete', err));
  }

  render() {
    const {
      zoom,
      locationTacos,
      allReviews,
      tacoMarkerIcon,
    } = this.state;
    const center = [this.state.lat, this.state.lng];
    let icon = '';
    const changeMarker = tacoMarkerIcon ? (
      icon = tacoIcon) : icon = defaultIcon;
    const makeMarkers = this.props.locations.map(location => (
      <Marker
      key={location.name}
      icon={changeMarker}
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
        address={location.address}
        deleteLocation={this.deleteLocation}
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

        <Control position="topright">
          <button className="btn btn-info" onClick={this.props.modalToggle} size="sm">Add Custom Location</button>
        </Control>
        <Control position="topright">
          <button className={tacoMarkerIcon ? 'btn btn-success' : 'btn btn-danger'} onClick={this.changeMarkerIcon} size="sm">
          {tacoMarkerIcon ? 'Back To Normal...' : 'Get Taco Crazy!'}</button>
        </Control>

      </Map>
      </div>
    );
  }
}

export default TacoMap;
