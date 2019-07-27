import React from 'react';

import './ZomatoLocationCard.scss';

class ZomatoLocationCard extends React.Component {
  render() {
    const { location, name } = this.props;
    console.error('locations from cards', location[0].restaurant.name);
    return (
      <div className="ZomatoLocationCard">
        <h3>{location.name}</h3>
      </div>
    );
  }
}

export default ZomatoLocationCard;
