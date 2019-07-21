import React from 'react';

import './TacoPopup.scss';

class TacoPopup extends React.Component {
  render() {
    const { locationTacos } = this.props;
    return (
      <div className="TacoPopup">
        {console.error(locationTacos)}
      </div>
    );
  }
}

export default TacoPopup;
