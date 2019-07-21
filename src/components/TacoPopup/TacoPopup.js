import React from 'react';

import { Popup } from 'react-leaflet';

import './TacoPopup.scss';

class TacoPopup extends React.Component {
  render() {
    const { locationName, locationTacos } = this.props;
    const tacoNames = locationTacos.map(taco => <li key={taco.id}>{taco.name}</li>);
    return (
      <div className="TacoPopup">
        <Popup key={locationName}>
        <h4>{locationName}</h4>
        <ul>{tacoNames}</ul>
      </Popup>
      </div>
    );
  }
}

export default TacoPopup;
