import React from 'react';

import './ZomatoLocation.scss';

import ZomatoLocationCard from '../ZomatoLocationCard/ZomatoLocationCard';

class ZomatoLocation extends React.Component {
  render() {
    const { zomatoLocations, currentLocations, addZomatoLocation } = this.props;
    const makeZomatoLocations = zomatoLocations.map(location => (
      <ZomatoLocationCard
      key={location.restaurant.id}
      location={location}
      name={location.restaurant.name}
      currentLocations={currentLocations}
      address={location.restaurant.location.address}
      lat={location.restaurant.location.latitude}
      lng={location.restaurant.location.longitude}
      addZomatoLocation={addZomatoLocation}
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
