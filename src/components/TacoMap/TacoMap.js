import React from 'react';

import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';

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

import Control from 'react-leaflet-control';

import TacoPopup from '../TacoPopup/TacoPopup';


import './TacoMap.scss';
import tacoData from '../../helpers/data/tacoData';

const defaultTaco = {
  locationId: '',
  ingredients: '',
  imageUrl: '',
  avgRating: 0,
  name: '',
};

class TacoMap extends React.Component {
  state = {
    lat: 36.1627,
    lng: -86.7816,
    zoom: 12,
    locationTacos: [],
    newTacoModal: false,
    newTaco: defaultTaco,
    locationId: '',
  }

  newTacoModalToggle = this.newTacoModalToggle.bind(this);

  newTacoModalToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      newTacoModal: !prevState.newTacoModal,
    }));
  }


  selectLocation = (e) => {
    const locationId = e.target.options.id;
    const matchTacos = this.props.tacos.filter(x => x.locationId === locationId);
    this.setState({ locationTacos: matchTacos });
  }

  getSingleTaco = (tacoId) => {
    tacoData.getSingleTaco(tacoId);
  }

  newTacoStateUpdates = (name, e) => {
    const { locationId } = this.state;
    const tempTaco = { ...this.state.newTaco };
    tempTaco[name] = e.target.value;
    tempTaco.locationId = locationId;
    this.setState({ newTaco: tempTaco });
  }

  newTacoName = e => this.newTacoStateUpdates('name', e);

  newTacoIngredients = e => this.newTacoStateUpdates('ingredients', e);

  newTacoImage = e => this.newTacoStateUpdates('imageUrl', e);

  addTaco = (locationId) => {
    this.setState({ locationId });
  }

  saveNewTaco = () => {
    const { newTaco, locationId } = this.state;
    newTaco.locationId = locationId;
    tacoData.addTaco(newTaco)
      .then(() => {
        tacoData.getTacos()
          .then(() => this.setState({ newTacoModal: false, locationId: '' }))
          .catch(err => console.error('could not get locations', err));
      });
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
        locationId={location.id}
        getSingleTaco={this.getSingleTaco}
        newTacoModalToggle={this.newTacoModalToggle}
        addTaco={this.addTaco}
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
      <Modal isOpen={this.state.newTacoModal} toggle={this.newTacoModalToggle} >
          <ModalHeader toggle={this.toggle}>Add New Taco</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="name">Taco Name</Label>{' '}
                <Input
                onChange={this.newTacoName}
                name="name"
                />
                <Label for="ingredients">Ingredients</Label>{' '}
                <Input
                onChange={this.newTacoIngredients}
                name="ingredients"
                />
                <Label for="imageUrl">Image URL</Label>{' '}
                <Input
                onChange={this.newTacoImage}
                name="imageUrl"
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={this.saveNewTaco}>Add Taco</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TacoMap;
