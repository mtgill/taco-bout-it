import React from 'react';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import './Review.scss';

import PropTypes from 'prop-types';


class Review extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    deleteReview: PropTypes.func.isRequired,
    editReview: PropTypes.func.isRequired,
  }

  reviewToDelete = (e) => {
    e.preventDefault();
    const reviewId = e.target.id;
    const { deleteReview } = this.props;
    deleteReview(reviewId);
  }

  selectReview = (e) => {
    const { editReview } = this.props;
    const reviewId = e.target.id;
    editReview(reviewId, e);
  }

  render() {
    const {
      date,
      comment,
      rating,
      id,
    } = this.props;
    return (
      <div className="Review">
        <Card body className="text-center">
          <CardHeader><h4>Date: {date}</h4></CardHeader>
            <CardText>Comment: {comment}</CardText>
            <CardText>Rating: {rating}</CardText>
          <Button id={id} className="btn btn-danger reviewButton" onClick={this.reviewToDelete}>Delete</Button>
          <Button id={id} className="btn btn-info reviewButton" onClick={this.selectReview}>Edit Review</Button>
        </Card>
      </div>
    );
  }
}

export default Review;
