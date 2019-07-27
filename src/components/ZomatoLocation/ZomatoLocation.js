import React from 'react';

import './ZomatoLocation.scss';

import ZomatoLocationCard from '../ZomatoLocationCard/ZomatoLocationCard';

class ZomatoLocation extends React.Component {
  render() {
    const { locations } = this.props;

    console.error('locations from zLoc', locations);
    const makeZomatoLocations = this.props.locations.map(location => (
      <ZomatoLocationCard
      key={location.name}
      location={location}
      // name={location[0].restaurant.name}
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
