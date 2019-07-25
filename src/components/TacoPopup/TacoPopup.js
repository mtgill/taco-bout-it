import React from 'react';

import { Link } from 'react-router-dom';

import { Popup } from 'react-leaflet';

import reviewData from '../../helpers/data/reviewData';
import AvgRating from '../AvgRating/AvgRating';

import './TacoPopup.scss';

class TacoPopup extends React.Component {
  state = {
    allRatings: [],
  }

  componentDidMount() {
    const { allRatings } = this.state;
    reviewData.getAllReviews()
      .then((reviews) => {
        reviews.forEach((review) => {
          allRatings.push(parseFloat(review.rating));
        });
      });
  }

  render() {
    const { allRatings } = this.state;
    const { locationName, locationTacos, locationId } = this.props;
    const tacoRow = locationTacos.map(taco => (
   <AvgRating key={taco.name} loc={locationName} ratings={allRatings} id={taco.id} to={`/singleTaco/${taco.id}/${locationName}`}><li>{taco.name}</li></AvgRating>));
    return (
      <div className="TacoPopup">
        <Popup key={locationName}>
        <h4>{locationName}</h4>
        <ul>{tacoRow}</ul>>
        <Link key={'newTaco'} id={locationId} to={`/newTaco/${locationId}`}><button className="btn btn-info btn-sm">Add New Taco</button></Link>
      </Popup>
      </div>
    );
  }
}

export default TacoPopup;
