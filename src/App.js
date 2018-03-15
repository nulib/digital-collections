import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomeContainer from './containers/HomeContainer';
import ContactUs from './containers/ContactUs';
import About from './containers/About';
import Login from './containers/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Nav />
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={HomeContainer} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
