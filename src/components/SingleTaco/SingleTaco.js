import React from 'react';

import tacoData from '../../helpers/data/tacoData';

import './SingleTaco.scss';

class SingleTaco extends React.Component {
  state = {
    taco: {},
    location: '',
  }

  componentDidMount() {
    const tacoId = this.props.match.params.id;
    const location = this.props.match.params.loc;
    this.setState({ location });
    tacoData.getSingleTaco(tacoId)
      .then(tacoPromise => this.setState({ taco: tacoPromise.data }))
      .catch(err => console.error('unable to get single taco', err));
  }

  render() {
    const { taco, location } = this.state;
    return (
      <div className="d-flex">
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
        </div>
      </div>
    );
  }
}

export default SingleTaco;
