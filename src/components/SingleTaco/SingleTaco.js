import React from 'react';

import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import tacoData from '../../helpers/data/tacoData';
import Review from '../Review/Review';

import reviewData from '../../helpers/data/reviewData';

import './SingleTaco.scss';

class SingleTaco extends React.Component {
  state = {
    taco: {},
    location: '',
    tacoId: '',
    reviews: [],
    reviewModal: false,
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

  render() {
    const { taco, location, reviews } = this.state;
    const makeReviews = reviews.map(review => (
      <Review
      key={review.rating}
      id={review.id}
      comment={review.comment}
      date={review.date}
      rating={review.rating}
      deleteReview={this.deleteReview}
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
            <FormGroup>
            <Label for="rating">Rating</Label>{' '}
                <Input
                // onChange={this.newLocationName}
                name="rating"
                />
                <Label for="comment">Comments</Label>{' '}
                <Input
                // onChange={this.newLocationAddress}
                name="comment"
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save Review</Button>
          </ModalFooter>
        </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleTaco;
