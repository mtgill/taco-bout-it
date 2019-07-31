import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Import firebase requirements
import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';

// Import components
import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import SingleTaco from '../components/SingleTaco/SingleTaco';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props}/>)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props}/>)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

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
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar authed={authed} />
            <div>
              {/* <h1 className="home-header">It's Taco Time!</h1> */}
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PrivateRoute path="/home" component={Home} authed={authed} />
                  <PrivateRoute path="/singleTaco/:id/:loc" component={SingleTaco} authed={authed} />
                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
