import React from 'react';

import reviewData from '../../helpers/data/reviewData';

import './AvgRating.scss';

class AvgRating extends React.Component {
  state = {
    avg: 0,
    allRatings: [],
  }

  getAverageRating = () => {
    const { tacoId, avgRating } = this.props;
    const { avg, allRatings } = this.state;
    reviewData.getReviews(tacoId)
      .then((reviews) => {
        reviews.forEach((review) => {
          allRatings.push(review.rating);
        });
        console.error('all ratings', allRatings);
      });
    this.setState({ allRatings });
  }

  componentDidMount() {
    this.getAverageRating();
  }

  render() {
    const { allRatings } = this.state;
    return (
      <div className="AvgRating">
        <h6>{allRatings}</h6>
      </div>
    );
  }
}

export default AvgRating;
