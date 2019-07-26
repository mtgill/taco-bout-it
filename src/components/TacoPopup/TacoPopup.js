import React from 'react';

import { Link } from 'react-router-dom';

import { Popup } from 'react-leaflet';

import {
  Table,
} from 'reactstrap';


import AvgRating from '../AvgRating/AvgRating';
import tacoData from '../../helpers/data/tacoData';


import './TacoPopup.scss';


class TacoPopup extends React.Component {
  addTaco = (e) => {
    const { locationId, addTaco } = this.props;
    this.props.newTacoModalToggle(e);
    addTaco(locationId);
  }


  render() {
    const { locationName, locationTacos, allReviews } = this.props;
    const tacoRow = locationTacos.map(taco => (
   <AvgRating key={taco.name} name={taco.name} loc={locationName} reviews={allReviews} id={taco.id} to={`/singleTaco/${taco.id}/${locationName}`}></AvgRating>));
    return (
      <div className="TacoPopup">
        <Popup key={locationName}>
          <h4>{locationName}</h4>
          <Table>
            <tbody>
            <tr>
              <th>Taco Name</th>
              <th>Avg Rating</th>
            </tr>
            {tacoRow}
            </tbody>
          </Table>
        <button className="btn btn-info btn-sm" onClick={this.addTaco}>Add New Taco</button>
      </Popup>
      </div>
    );
  }
}

export default TacoPopup;
