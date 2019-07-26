import React from 'react';

import { Link } from 'react-router-dom';

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

import reviewData from '../../helpers/data/reviewData';
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
  state = {
    allReviews: [],
    newTacoModal: false,
    newTaco: defaultTaco,
    locationId: this.props.locationId,
  }

  newTacoModalToggle = this.newTacoModalToggle.bind(this);

  newTacoModalToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      newTacoModal: !prevState.newTacoModal,
    }));
  }

  componentDidMount() {
    const { allReviews } = this.state;
    reviewData.getAllReviews()
      .then((reviews) => {
        reviews.forEach((review) => {
          allReviews.push(review);
        });
      });

    // const { id } = this.props.match.params;
    // this.setState({ locationId: id });
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

  saveNewTaco = () => {
    const { newTaco, locationId } = this.state;
    newTaco.locationId = locationId;
    tacoData.addTaco(newTaco)
      .then(() => {
        tacoData.getTacos()
          .then(tacos => this.setState({ newTacoModal: false }))
          .catch(err => console.error('could not get locations', err));
      });
  }


  render() {
    const { allReviews } = this.state;
    const { locationName, locationTacos, locationId } = this.props;
    const tacoRow = locationTacos.map(taco => (
   <AvgRating key={taco.name} name={taco.name} loc={locationName} reviews={allReviews} id={taco.id} to={`/singleTaco/${taco.id}/${locationName}`}></AvgRating>));
    return (
      <div className="TacoPopup">
        <Popup key={locationName}>
          <h4>{locationName}</h4>
          <Table>
            <tbody>
            <tr>
              <th>Taco Name</th>
              <th>Avg Rating</th>
            </tr>
            {tacoRow}
            </tbody>
          </Table>
        <Link key={'newTaco'} id={locationId} onClick={this.newTacoModalToggle}><button className="btn btn-info btn-sm">Add New Taco</button></Link>
      </Popup>
      <Modal isOpen={this.state.newTacoModal} toggle={this.newTacoModal} >
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

export default TacoPopup;
