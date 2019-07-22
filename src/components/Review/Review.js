import React from 'react';

import reviewData from '../../helpers/data/reviewData';

import './Review.scss';

class Review extends React.Component {
  render() {
    const { review } = this.props;
    console.error('review from reviews', review);
    // const { tacoId } = this.props;
    // const review = reviewData.getReviews(tacoId);
    // this.getReviews(tacoId);
    return (
      <div className="Review">
        <h1>Reviews</h1>
        <p>{review.comment}</p>
      </div>
    );
  }
}

export default Review;
