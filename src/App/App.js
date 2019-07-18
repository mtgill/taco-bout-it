import React from 'react';

import MyNavBar from '../components/MyNavBar/MyNavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyNavBar />
      </div>
    );
  }
}

export default App;
