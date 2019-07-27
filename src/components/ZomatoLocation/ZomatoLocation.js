import React from 'react';

import './ZomatoLocation.scss';

import ZomatoLocationCard from '../ZomatoLocationCard/ZomatoLocationCard';

class ZomatoLocation extends React.Component {
  render() {
    // console.error('locations from zLoc', this.props.locations);
    const makeZomatoLocations = this.props.locations.map(location => (
      <ZomatoLocationCard
      key={location.name}
      location={location}
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
