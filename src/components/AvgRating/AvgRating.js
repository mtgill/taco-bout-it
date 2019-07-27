import React from 'react';

import { Link } from 'react-router-dom';

import './AvgRating.scss';

import PropTypes from 'prop-types';

class AvgRating extends React.Component {
  static propTypes = {
    reviews: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    loc: PropTypes.string.isRequired,
  }

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
      this.setState({ rating: avg });
    }
  }

  render() {
    const { name, id, loc } = this.props;
    const { rating } = this.state;
    return (
      <tr>
      <td><Link to={`/singleTaco/${id}/${loc}`}>{name}</Link></td>
      <td>{rating}</td>
    </tr>
    );
  }
}

export default AvgRating;
