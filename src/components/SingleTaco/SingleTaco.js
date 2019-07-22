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
      <div className="SingleTaco">
        <h1>{taco.name}</h1>
      </div>
    );
  }
}

export default SingleTaco;
