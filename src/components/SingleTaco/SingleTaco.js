import React from 'react';

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import PropTypes from 'prop-types';

import moment from 'moment';

import tacoData from '../../helpers/data/tacoData';
import Review from '../Review/Review';

import reviewData from '../../helpers/data/reviewData';

import './SingleTaco.scss';

const defaultReview = {
  comment: '',
  date: '',
  rating: 0,
  tacoId: '',
  uid: '',
};

class SingleTaco extends React.Component {
  static propTypes = {
    tacoId: PropTypes.string,
    location: PropTypes.object.isRequired,
  }

  state = {
    taco: {},
    location: '',
    tacoId: '',
    reviews: [],
    reviewModal: false,
    newReview: defaultReview,
    ratingInput: 0,
    commentInput: '',
    revId: '',
    edit: false,
  }

  reviewModalToggle = this.reviewModalToggle.bind(this);

  reviewModalToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      reviewModal: !prevState.reviewModal,
    }));
  }

  getReviews = () => {
    const { tacoId } = this.state;
    reviewData.getReviews(tacoId)
      .then(resp => this.setState({ reviews: resp }))
      .catch(err => console.error('unable to get reviews', err));
  }

  componentDidMount() {
    const tacoId = this.props.match.params.id;
    const location = this.props.match.params.loc;
    this.setState({ location });
    this.setState({ tacoId });
    tacoData.getSingleTaco(tacoId)
      .then(tacoPromise => this.setState({ taco: tacoPromise.data }))
      .catch(err => console.error('unable to get single taco', err));
    reviewData.getReviews(tacoId)
      .then(resp => this.setState({ reviews: resp }))
      .catch(err => console.error('unable to get reviews', err));
  }

  deleteReview = (reviewId) => {
    const { tacoId } = this.state;
    reviewData.deleteReview(reviewId)
      .then(() => this.getReviews(tacoId))
      .catch(err => console.error('unable to delete', err));
  }

  newReviewStateUpdates = (name, e) => {
    const { tacoId } = this.state;
    const tempReview = { ...this.state.newReview };
    tempReview[name] = e.target.value;
    tempReview.date = this.getDate();
    tempReview.tacoId = tacoId;
    tempReview.rating = parseFloat(tempReview.rating, 2);
    this.setState({ newReview: tempReview });
  }

  newReviewRating = e => this.newReviewStateUpdates('rating', e);

  newReviewComment = e => this.newReviewStateUpdates('comment', e);

  getDate = () => moment().format('MMMM Do YYYY');

  saveNewReview = () => {
    const { newReview, tacoId } = this.state;
    reviewData.addReview(newReview)
      .then(() => {
        this.setState({ reviewModal: false });
        this.getReviews(tacoId);
      });
  }

  editReview = (reviewId, e) => {
    this.reviewModalToggle(e);
    this.setState({ edit: true });
    reviewData.getSingleReview(reviewId)
      .then((reviewPromise) => {
        const review = reviewPromise.data;
        console.error(reviewId);
        this.setState({
          ratingInput: review.rating,
          commentInput: review.comment,
          revId: reviewId,
        });
      });
  };

  updateReview = () => {
    const { newReview, tacoId, revId } = this.state;
    reviewData.updateReview(newReview, revId)
      .then(() => {
        this.setState({
          reviewModal: false,
          edit: false,
          revId: '',
          ratingInput: 0,
          commentInput: '',
        });
        this.getReviews(tacoId);
      });
  }

  render() {
    const {
      taco,
      location,
      reviews,
      ratingInput,
      commentInput,
      edit,
    } = this.state;
    const makeReviews = reviews.map(review => (
      <Review
      key={review.id}
      id={review.id}
      comment={review.comment}
      date={review.date}
      rating={review.rating}
      deleteReview={this.deleteReview}
      editReview={this.editReview}
      />
    ));
    return (
      <div className="SingleTaco">
        <div className="col-10">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{taco.name} - {location}</h3>
              <h5 className="card-text">Taco Name: {taco.name}</h5>
              <h5 className="card-text">Location: {location}</h5>
              <h5 className="card-text">Ingredients: {taco.ingredients}</h5>
              <button className="btn btn-success" onClick={this.reviewModalToggle}>Add Review</button>
            </div>
          </div>
          <div>
            {makeReviews}
          </div>
          <div className="reviewModal">
          <Modal isOpen={this.state.reviewModal} toggle={this.reviewModalToggle} >
          <ModalHeader toggle={this.toggle}>Add New Review</ModalHeader>
          <ModalBody>
            <Form>
            <FormGroup>
            <Label for="rating">Rating: </Label>{' '}
                <Input
                className="form-control"
                type="number"
                onChange={this.newReviewRating}
                name="rating"
                placeholder={ratingInput}
                />
                </FormGroup>
                <FormGroup>
                <Label for="comment">Comments: </Label>{' '}
                <Input
                type="textarea"
                onChange={this.newReviewComment}
                name="comment"
                placeholder={commentInput}
                />
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={edit ? this.updateReview : this.saveNewReview}>Save Review</Button>
          </ModalFooter>
        </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleTaco;
