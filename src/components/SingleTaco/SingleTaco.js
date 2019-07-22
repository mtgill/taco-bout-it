import React from 'react';

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
        <div className="SingleTaco col-10">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{taco.name} - {location}</h3>
              <h5 className="card-text">Taco Name: {taco.name}</h5>
              <h5 className="card-text">Location: {location}</h5>
              <h5 className="card-text">Ingredients: {taco.ingredients}</h5>
              <button className="btn btn-success">Add Review</button>
            </div>
          </div>
          <div>
            {makeReviews}
        </div>
        </div>
    );
  }
}

export default SingleTaco;
