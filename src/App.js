import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from './components/Header/';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LandingPage from './containers/LandingPage';
import SetsPage from './containers/SetsPage';
import ItemDetailPage from './containers/ItemDetailPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Nav />
          <Route exact path="/" component={LandingPage} />
          <Route path="/sets/:sectionType/:id?" component={SetsPage} />
          <Route path="/item" component={ItemDetailPage} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
