import React from 'react';

import {
  Card,
  CardText,
  CardHeader,
  Button,
} from 'reactstrap';

import './ZomatoLocationCard.scss';

class ZomatoLocationCard extends React.Component {
  render() {
    const { location, name } = this.props;
    console.error('locations from cards', location.restaurant.name);
    return (
      <div className="ZomatoLocationCard">
                <Card body className="text-center">
          <CardHeader><h4>{location.restaurant.name}</h4></CardHeader>
        </Card>
      </div>
    );
  }
}

export default ZomatoLocationCard;
