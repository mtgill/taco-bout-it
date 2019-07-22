import React from 'react';

import { Link } from 'react-router-dom';

import { Popup } from 'react-leaflet';

import './TacoPopup.scss';

class TacoPopup extends React.Component {
  state = {
    tacoId: '',
  }

  singleTaco = (e) => {
    const { tacoId } = this.state;
    e.preventDefault();
    this.setState({ tacoId: e.target.key });
    const { getSingleTaco } = this.props;
    getSingleTaco(tacoId);
  }

  render() {
    const { locationName, locationTacos } = this.props;
    const tacoNames = locationTacos.map(taco => (
    <Link key={taco.name} id={taco.id} to={`/singleTaco/${taco.id}`}><li>{taco.name}</li></Link>));
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
