import React from 'react';

import {
  Card,
  CardText,
  CardHeader,
  Button,
} from 'reactstrap';

import './ZomatoLocationCard.scss';

class ZomatoLocationCard extends React.Component {
  state = {
    duplicate: false,
  }

  componentDidMount() {
    const { currentLocations, address } = this.props;
    currentLocations.forEach((location) => {
      if (location.address === address) {
        this.setState({ duplicate: true });
      }
    });
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
          <Button className={duplicate ? 'btn btn-outline-success disabled' : 'btn btn-success'}>Add This Location!</Button>
        </Card>
      </div>
    );
  }
}

export default ZomatoLocationCard;
