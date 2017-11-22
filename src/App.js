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
import CollectionsPage from './containers/CollectionsPage';
import SetPage from './containers/SetPage';
import CollectionPage from './containers/CollectionPage';
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
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/collections" component={CollectionsPage} />
          <Route exact path="/collections/:id" component={CollectionPage} />
          <Route exact path="/sets/:sectionType" component={SetsPage} />
          <Route exact path="/sets/:sectionType/:id" component={SetPage} />
          <Route path="/item/:id" component={ItemDetailPage} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
