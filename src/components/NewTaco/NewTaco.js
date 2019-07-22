import React from 'react';

import './NewTaco.scss';

class NewTaco extends React.Component {
  render() {
    const locationId = this.props.match.params.locationName;
    return (
      <div className="NewTaco">
      </div>
    );
  }
}

export default NewTaco;
