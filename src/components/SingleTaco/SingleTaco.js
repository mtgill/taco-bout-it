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
    review: [],
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
      .then(review => this.setState({ review: review[0] }));
  }

  render() {
    const { taco, location, review } = this.state;
    console.error('review from single', review);
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
            <Review key={'review'} id={review.id} review={review} />
        </div>
        </div>
    );
  }
}

export default SingleTaco;
