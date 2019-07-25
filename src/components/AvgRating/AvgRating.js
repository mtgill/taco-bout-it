import React from 'react';

import reviewData from '../../helpers/data/reviewData';

import './AvgRating.scss';

class AvgRating extends React.Component {
  state = {
    avg:
    parseFloat(this.props.ratings.reduce((a, b) => a + b, 0) / this.props.ratings.length, 2),
  }

  render() {
    console.error('allratings in render', this.props.ratings);
    const showAvg = () => {
      const { avg } = this.state;
      return (
      <div>
        <p>{avg}</p>
      </div>
      );
    };
    return (
      <div className="AvgRating">
        <h6>{showAvg}</h6>
      </div>
    );
  }
}

export default AvgRating;
