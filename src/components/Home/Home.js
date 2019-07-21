import React from 'react';

import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import TacoMap from '../TacoMap/TacoMap';

import './Home.scss';

class Home extends React.Component {
  state = {
    locationModal: false,
  }

  locationModalToggle = this.locationModalToggle.bind(this);

  locationModalToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      locationModal: !prevState.locationModal,
    }));
  }

  render() {
    return (
      <div className="Home">
        <TacoMap />
        <button className="btn btn-warning" onClick={this.locationModalToggle}>Add Location</button>
        <Modal isOpen={this.state.locationModal} toggle={this.locationModalToggle} >
          <ModalHeader toggle={this.toggle}>Add New Location</ModalHeader>
          <ModalBody>
            <FormGroup>
            <Label for="locationName">Location Name</Label>{' '}
                <Input
                name="locationName"
                />
                <Label for="locationAddress">Address</Label>{' '}
                <Input
                name="locationAddress"
                />
                <Label for="locationLat">Latitude</Label>{' '}
                <Input
                name="locationLat"
                />
                <Label for="locationLng">Longitude</Label>{' '}
                <Input
                name="locationLng"
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Add Location</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Home;
