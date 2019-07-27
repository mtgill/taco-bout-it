import React from 'react';

import {
  Card,
  CardText,
  CardHeader,
  Button,
} from 'reactstrap';

import locationData from '../../helpers/data/locationData';

import './ZomatoLocationCard.scss';

class ZomatoLocationCard extends React.Component {
  state = {
    duplicate: false,
  }

  addToMap = () => {
    const {
      name,
      address,
      lat,
      lng,
      addZomatoLocation,
    } = this.props;
    addZomatoLocation(name, address, lat, lng);
    this.setState({ duplicate: true });
  }

  duplicateCheck = () => {
    const { currentLocations, address } = this.props;
    currentLocations.forEach((location) => {
      if (location.address === address) {
        this.setState({ duplicate: true });
      }
    });
  }

  componentDidMount() {
    this.duplicateCheck();
  }

  render() {
    const { duplicate } = this.state;
    const { location, name, address } = this.props;
    // console.error('locations from cards', location.restaurant.name);
    return (
      <div className="ZomatoLocationCard">
        <Card body className="text-center">
          <CardHeader><h4>{name}</h4></CardHeader>
          <CardText>{address}</CardText>
          <Button className={duplicate ? 'btn btn-outline-success disabled' : 'btn btn-success'} onClick={this.addToMap}>Add This Location!</Button>
        </Card>
      </div>
    );
  }
}

export default ZomatoLocationCard;
