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
} from 'reactstrap';

import TacoMap from '../TacoMap/TacoMap';

import locationData from '../../helpers/data/locationData';
import tacoData from '../../helpers/data/tacoData';

import './Home.scss';

const defaultLocation = {
  name: '',
  address: '',
  lat: 0,
  lng: 0,
};

class Home extends React.Component {
  state = {
    locationModal: false,
    newLoc: defaultLocation,
    locations: [],
    tacos: [],
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

  componentDidMount() {
    this.getLocations();
    this.getTacos();
  }

  newLocationStateUpdates = (name, e) => {
    const tempLoc = { ...this.state.newLoc };
    tempLoc[name] = e.target.value;
    this.setState({ newLoc: tempLoc });
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

  render() {
    const { tacos, locations } = this.state;
    return (
      <div className="Home">
        <TacoMap tacos={tacos} locations={locations} />
        <button className="btn btn-warning" onClick={this.locationModalToggle}>Add Location</button>
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
