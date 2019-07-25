import React from 'react';

import { Link } from 'react-router-dom';

import { Popup } from 'react-leaflet';

import { Table } from 'reactstrap';

import reviewData from '../../helpers/data/reviewData';
import AvgRating from '../AvgRating/AvgRating';

import './TacoPopup.scss';

class TacoPopup extends React.Component {
  state = {
    allReviews: [],
  }

  componentDidMount() {
    const { allReviews } = this.state;
    reviewData.getAllReviews()
      .then((reviews) => {
        reviews.forEach((review) => {
          allReviews.push(review);
        });
      });
  }

  render() {
    const { allReviews } = this.state;
    const { locationName, locationTacos, locationId } = this.props;
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
        <Link key={'newTaco'} id={locationId} to={`/newTaco/${locationId}`}><button className="btn btn-info btn-sm">Add New Taco</button></Link>
      </Popup>
      </div>
    );
  }
}

export default TacoPopup;
