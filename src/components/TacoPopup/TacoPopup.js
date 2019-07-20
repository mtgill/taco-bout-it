import React from 'react';

import './TacoPopup.scss';

class TacoPopup extends React.Component {
  render() {
    const { locations, tacos } = this.props;
    const matchedTacos = [];
    matchedTacos.push(locations.filter(location => tacos.includes(location.id)));

    console.error('matched tacos', matchedTacos);
    console.error('locations from pop', locations);
    return (
      <div className="TacoPopup">
      </div>
    );
  }
}

export default TacoPopup;
