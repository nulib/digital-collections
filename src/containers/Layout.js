import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/';
import Nav from '../components/Nav';
import GlobalSearch from '../components/GlobalSearch';
import Footer from '../components/Footer';
import HomePage from './HomePage';
import ContactUs from './ContactUs';
import About from './About';
import Login from './Login';
import '../Layout.css';
import '../libs/nuwebcomm-scripts.js';

const Layout = () => {
  return (
    <div>
      <Header />
      <Nav />
      <GlobalSearch />
      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
