import React from 'react';

import './Review.scss';

class Review extends React.Component {
  render() {
    const { date, comment, rating } = this.props;
    return (
      <div className="Review">
        <h1>Review</h1>
        <h5>Date: {date}</h5>
        <h5>Comment: {comment}</h5>
        <h5>Rating: {rating}</h5>
      </div>
    );
  }
}

export default Review;
