import React from 'react';

import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';

import TacoMap from '../TacoMap/TacoMap';

import locationData from '../../helpers/data/locationData';
import tacoData from '../../helpers/data/tacoData';

import './Home.scss';
import zomatoData from '../../helpers/data/zomatoData';

import ZomatoLocation from '../ZomatoLocation/ZomatoLocation';

const defaultLocation = {
  name: '',
  address: '',
  lat: 0,
  lng: 0,
};

class Home extends React.Component {
  state = {
    locations: [],
    tacos: [],
    locationModal: false,
    newLoc: defaultLocation,
    zomatoLocs: [],
    load: false,
  }

  locationModalToggle = this.locationModalToggle.bind(this);

  locationModalToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      locationModal: !prevState.locationModal,
    }));
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

  getZomatoLocations = () => {
    Promise.all([zomatoData.getZomatoLocations(), zomatoData.getZomatoLocationsTwo()])
      .then((zLocs) => {
        const zLoc = [...zLocs[0], ...zLocs[1]];
        this.setState({ zomatoLocs: zLoc, load: true });
      });
  }

  componentDidMount() {
    this.getLocations();
    this.getTacos();
    this.getZomatoLocations();
  }

  newLocationStateUpdates = (name, e) => {
    const tempLoc = { ...this.state.newLoc };
    tempLoc[name] = e.target.value;
    this.setState({ newLoc: tempLoc });
  }

  getLocations = () => {
    locationData.getLocations()
      .then(locations => this.setState({ locations }))
      .catch(err => console.error('could not get locations', err));
  }

  newLocationName = e => this.newLocationStateUpdates('name', e);

  newLocationAddress = e => this.newLocationStateUpdates('address', e);

  newLocationLat = e => this.newLocationStateUpdates('lat', e);

  newLocationLng = e => this.newLocationStateUpdates('lng', e);


  saveNewLoc = () => {
    const { newLoc } = this.state;
    locationData.addLocation(newLoc)
      .then(() => {
        this.setState({ locationModal: false });
        this.getLocations();
      });
  }

  addZomatoLocation = (name, address, lat, lng) => {
    const newLoc = {
      name,
      address,
      lat,
      lng,
    };
    locationData.addLocation(newLoc)
      .then(() => {
        locationData.getLocations()
          .then(res => this.setState({ locations: res }));
      });
  }

  render() {
    const {
      tacos,
      locations,
      zomatoLocs,
      load,
    } = this.state;
    // const isLoaded = load ? (
    // <Spinner color="primary" />) : null;
    const loadZLocs = load ? (
      <ZomatoLocation key={'zomato'} zomatoLocations={zomatoLocs} currentLocations={locations} addZomatoLocation={this.addZomatoLocation} />) : (
      <Spinner type="grow" className="zLocSpinner m-5" color="info" />);

    return (
      <div className="Home">
        {/* <div className="home-header"><h1>Let's Taco 'Bout It</h1></div> */}
        <div className="col-9 map">
        <TacoMap tacos={tacos} locations={locations} modalToggle={this.locationModalToggle} />
        </div>
        <div className="col-3 zomato-locations zLocs">
          {loadZLocs}
        </div>
        <Modal isOpen={this.state.locationModal} toggle={this.locationModalToggle} >
          <ModalHeader toggle={this.toggle}>Add New Location</ModalHeader>
          <ModalBody>
            <FormGroup>
            <Label for="name">Location Name</Label>{' '}
                <Input
                onChange={this.newLocationName}
                name="name"
                />
                <Label for="address">Address</Label>{' '}
                <Input
                onChange={this.newLocationAddress}
                name="address"
                />
                <Label for="lat">Latitude</Label>{' '}
                <Input
                onChange={this.newLocationLat}
                name="lat"
                />
                <Label for="lng">Longitude</Label>{' '}
                <Input
                onChange={this.newLocationLng}
                name="lng"
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveNewLoc}>Add Location</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Home;
