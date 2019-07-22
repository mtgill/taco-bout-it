import React from 'react';

import tacoData from '../../helpers/data/tacoData';

import './SingleTaco.scss';

class SingleTaco extends React.Component {
  state = {
    taco: {},
  }

  componentDidMount() {
    const tacoId = this.props.match.params.id;
    tacoData.getSingleTaco(tacoId)
      .then(tacoPromise => this.setState({ taco: tacoPromise.data }))
      .catch(err => console.error('unable to get single taco', err));
  }

  render() {
    const { taco } = this.state;
    return (
      <div className="SingleTaco col-8">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{taco.name}</h3>
            <h5 className="card-text">Ingredients: {taco.ingredients}</h5>
            <button className="btn btn-success">Add Review</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleTaco;
