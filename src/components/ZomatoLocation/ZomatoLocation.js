import React from 'react';

import './ZomatoLocation.scss';

import ZomatoLocationCard from '../ZomatoLocationCard/ZomatoLocationCard';

class ZomatoLocation extends React.Component {
  render() {
    const { zomatoLocations, currentLocations } = this.props;
    const makeZomatoLocations = zomatoLocations.map(location => (
      <ZomatoLocationCard
      key={location.restaurant.id}
      location={location}
      name={location.restaurant.name}
      currentLocations={currentLocations}
      address={location.restaurant.location.address}
      />
    ));
    return (
      <div className="ZomatoLocation">
        {makeZomatoLocations}
      </div>
    );
  }
}

export default ZomatoLocation;
