import React from 'react';

import {
  Alert,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';


import firebase from 'firebase/app';
import 'firebase/auth';

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
      uid,
    } = this.props;
    const user = firebase.auth().currentUser.uid;
    return (
      <div className="Review">
        <Card body className="text-center">
          <CardHeader><h4>Date: {date}</h4></CardHeader>
            <CardText>Comment: {comment}</CardText>
            <CardText>Rating: {rating}</CardText>
          <Button id={id}
          className={uid === user ? 'btn btn-danger deleteButton' : 'btn btn-danger deleteButton disabled'}
          onClick={uid === user ? this.reviewToDelete : null }>Delete</Button>
          <Button className={uid === user ? 'btn btn-info reviewButton' : 'btn btn-info reviewButton disabled'} id={id}
          onClick={uid === user ? this.selectReview : null }>Edit Review</Button>
        </Card>
      </div>
    );
  }
}

export default Review;
