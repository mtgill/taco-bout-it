import React from 'react';

import reviewData from '../../helpers/data/reviewData';

import './AvgRating.scss';

class AvgRating extends React.Component {
  state = {
    rating: 0,
  }

  componentDidMount() {
    const { reviews, id } = this.props;
    const avgRatings = reviews.filter(x => x.tacoId === id);
    const tempRating = [];
    if (avgRatings.length > 0) {
      avgRatings.forEach((review) => {
        tempRating.push(parseInt(review.rating, 10));
      });
      const avg = tempRating.reduce((a, b) => a + b, 0) / tempRating.length;
      console.error(avgRatings);
      this.setState({ rating: avg });
    }
  }

  render() {
    return (
      <div className="AvgRating">
        <h6>{this.state.rating}</h6>
      </div>
    );
  }
}

export default AvgRating;
