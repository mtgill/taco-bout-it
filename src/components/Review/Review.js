import React from 'react';

import './Review.scss';

class Review extends React.Component {
  reviewToDelete = (e) => {
    e.preventDefault();
    const reviewId = e.target.id;
    const { deleteReview } = this.props;
    deleteReview(reviewId);
  }

  render() {
    const {
      date,
      comment,
      rating,
      id,
      editReview,
    } = this.props;
    return (
      <div className="Review">
        <h3>Review</h3>
        <h5>Date: {date}</h5>
        <h5>Comment: {comment}</h5>
        <h5>Rating: {rating}</h5>
        <button id={id} className="btn btn-danger" onClick={this.reviewToDelete}>Delete</button>
        <button id={id} className="btn btn-info" onClick={editReview}>Edit Review</button>
      </div>
    );
  }
}

export default Review;
