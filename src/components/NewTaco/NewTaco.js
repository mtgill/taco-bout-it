import React from 'react';

import './NewTaco.scss';

const defaultTaco = {
  locationId: '',
  ingredients: '',
  imageUrl: '',
  avgRating: 0,
  name: '',
};

class NewTaco extends React.Component {
  state = {
    newTaco: defaultTaco,
    locationId: '',
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ locationId: id });
  }

  render() {
    const { locationId } = this.state;
    return (
      <div className="NewTaco">
        <h1>{locationId}</h1>
      </div>
    );
  }
}

export default NewTaco;
