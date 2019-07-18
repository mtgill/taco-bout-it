import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/Auth/Auth';
import fbConnection from '../helpers/data/connection';
import MyNavBar from '../components/MyNavBar/MyNavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
            <MyNavBar authed={authed} />
      </div>
    );
  }
}

export default App;
