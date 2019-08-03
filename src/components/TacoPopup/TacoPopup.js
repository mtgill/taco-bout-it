import React from 'react';

import { Popup } from 'react-leaflet';


import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';

import PropTypes from 'prop-types';

import AvgRating from '../AvgRating/AvgRating';
import tacoData from '../../helpers/data/tacoData';


import './TacoPopup.scss';

const defaultTaco = {
  locationId: '',
  ingredients: '',
  imageUrl: '',
  avgRating: 0,
  name: '',
};

class TacoPopup extends React.Component {
  static propTypes = {
    addTaco: PropTypes.func.isRequired,
    locationId: PropTypes.string.isRequired,
    saveNewTaco: PropTypes.func.isRequired,
    locationName: PropTypes.string.isRequired,
    allReviews: PropTypes.array.isRequired,
    locationTacos: PropTypes.array.isRequired,
  }

  state = {
    tacos: [],
    newTacoModal: false,
    newTaco: defaultTaco,
  }

  newTacoModalToggle = this.newTacoModalToggle.bind(this);

  newTacoModalToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      newTacoModal: !prevState.newTacoModal,
    }));
  }


  addTaco = (e) => {
    const { locationId, addTaco } = this.props;
    this.newTacoModalToggle(e);
    addTaco(locationId);
  }

  newTacoStateUpdates = (name, e) => {
    const { locationId } = this.props;
    const tempTaco = { ...this.state.newTaco };
    tempTaco[name] = e.target.value;
    tempTaco.locationId = locationId;
    this.setState({ newTaco: tempTaco });
  }

  newTacoName = e => this.newTacoStateUpdates('name', e);

  newTacoIngredients = e => this.newTacoStateUpdates('ingredients', e);

  newTacoImage = e => this.newTacoStateUpdates('imageUrl', e);

  saveTacos = () => {
    const { newTaco } = this.state;
    const { saveNewTaco } = this.props;
    tacoData.addTaco(newTaco)
      .then(() => {
        saveNewTaco(this.props.locationId);
        this.setState({ newTacoModal: false });
      });
  }

  locationToDelete = () => {
    const { deleteLocation, locationId } = this.props;
    deleteLocation(locationId);
  }


  render() {
    const {
      locationName,
      allReviews,
      locationTacos,
      address,
    } = this.props;
    const tacoRow = locationTacos.map(taco => (
   <AvgRating key={taco.name} name={taco.name} loc={locationName} reviews={allReviews} id={taco.id} to={`/singleTaco/${taco.id}/${locationName}`}></AvgRating>));
    return (
      <div className="TacoPopup text-align-center">
        <Popup key={locationName}>
          <h4>{locationName}</h4>
          <h6>{address}</h6>
          <Table>
            <tbody>
            <tr>
              <th>Taco Name</th>
              <th>Avg Rating</th>
            </tr>
            {tacoRow}
            </tbody>
          </Table>
        <button className="btn btn-info btn-sm" onClick={this.addTaco}>Add New Taco</button>
        <button className="btn btn-danger btn-sm" onClick={this.locationToDelete}>Delete Location</button>
      </Popup>
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
          <Button color="primary" onClick={this.saveTacos}>Add Taco</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TacoPopup;
