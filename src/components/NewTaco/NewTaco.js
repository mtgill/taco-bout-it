import React from 'react';

import {
  Button,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import tacoData from '../../helpers/data/tacoData';

import './NewTaco.scss';

const defaultTaco = {
  locationId: '',
  ingredients: '',
  imageUrl: '',
  avgRating: 0,
  name: '',
};

class NewTaco extends React.Component {
  state = {
    newTaco: defaultTaco,
    locationId: '',
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ locationId: id });
  }

  newTacoStateUpdates = (name, e) => {
    const tempTaco = { ...this.state.newTaco };
    tempTaco[name] = e.target.value;
    this.setState({ newTaco: tempTaco });
  }

  newTacoName = e => this.newTacoStateUpdates('name', e);

  newTacoIngredients = e => this.newTacoStateUpdates('ingredients', e);

  newTacoImage = e => this.newTacoStateUpdates('imageUrl', e);

  saveNewTaco = () => {
    const { newTaco, locationId } = this.state;
    newTaco.locationId = locationId;
    tacoData.addTaco(newTaco)
      .then(() => this.props.history.push('/home'));
  }

  render() {
    return (
      <div className="NewTaco">
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
            <Button color="primary" onClick={this.saveNewTaco}>Add Taco</Button>
      </div>
    );
  }
}

export default NewTaco;
