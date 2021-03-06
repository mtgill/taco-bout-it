import React from 'react';

import './ZomatoLocation.scss';

import ZomatoLocationCard from '../ZomatoLocationCard/ZomatoLocationCard';

class ZomatoLocation extends React.Component {
  render() {
    const { zomatoLocations, currentLocations, addZomatoLocation } = this.props;
    const makeZomatoLocations = zomatoLocations.map(location => (
      <ZomatoLocationCard
      key={location.id}
      location={location}
      name={location.name}
      currentLocations={currentLocations}
      address={location.location.address}
      lat={location.location.latitude}
      lng={location.location.longitude}
      addZomatoLocation={addZomatoLocation}
      filterPhotos={this.filterPhotos}
      />
    ));
    return (
      <div className="ZomatoLocation">
        <h3 className="SuggestedLocationHeader">Suggested Locations</h3>
        {makeZomatoLocations}
      </div>
    );
  }
}

export default ZomatoLocation;
