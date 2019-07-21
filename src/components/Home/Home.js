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

// const defaultLocation = {
//   newLocName: '',
//   newLocAddress: '',
//   newLocLat: 0,
//   newLocLng: 0,
// };

class Home extends React.Component {
  state = {
    locationModal: false,
    newLocName: '',
    newLocAddress: '',
    newLocLat: 0,
    newLocLng: 0,
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

  newLocationName = (e) => {
    e.preventDefault();
    this.setState({ newLocName: e.target.value });
  }

  newLocationAddress = (e) => {
    e.preventDefault();
    this.setState({ newLocAddress: e.target.value });
  }

  newLocationLat = (e) => {
    e.preventDefault();
    this.setState({ newLocLat: e.target.value });
  }

  newLocationLng = (e) => {
    e.preventDefault();
    this.setState({ newLocLng: e.target.value });
  }

  refreshLocations = () => {

  }

  saveNewLoc = () => {
    const {
      newLocAddress,
      newLocLng,
      newLocLat,
      newLocName,
    } = this.state;
    const newLoc = {
      name: newLocName,
      address: newLocAddress,
      lat: newLocLat,
      lng: newLocLng,
    };
    locationData.addLocation(newLoc)
      .then(() => {
        this.setState({ locationModal: false });
        locationData.getLocations()
          .then(locations => this.setState({ locations }));
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
            <Label for="locationName">Location Name</Label>{' '}
                <Input
                onChange={this.newLocationName}
                name="locationName"
                />
                <Label for="locationAddress">Address</Label>{' '}
                <Input
                onChange={this.newLocationAddress}
                name="locationAddress"
                />
                <Label for="locationLat">Latitude</Label>{' '}
                <Input
                onChange={this.newLocationLat}
                name="locationLat"
                />
                <Label for="locationLng">Longitude</Label>{' '}
                <Input
                onChange={this.newLocationLng}
                name="locationLng"
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
