import React from 'react';

import TacoMap from '../Map/TacoMap';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <TacoMap />
      </div>
    );
  }
}

export default Home;
