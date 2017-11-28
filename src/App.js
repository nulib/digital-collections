import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header/';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LandingPage from './containers/LandingPage';
import SetsPage from './containers/SetsPage';
import SetPage from './containers/SetPage';
import ItemDetailPage from './containers/ItemDetailPage';
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
            <Route exact path="/" component={LandingPage} />
            <Route path="/about" component={About} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/login" component={Login} />
            <Route exact path="/:sectionType" component={SetsPage} />
            <Route exact path="/:sectionType/:id" component={SetPage} />
            <Route exact path="/:sectionType/:id/:itemId" component={ItemDetailPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
