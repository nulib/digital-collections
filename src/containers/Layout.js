import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/';
import Nav from '../components/Nav';
import GlobalSearch from '../components/GlobalSearch';
import Footer from '../components/Footer';
import HomeContainer from './HomeContainer';
import ContactUs from './ContactUs';
import About from './About';
import Login from './Login';
import '../App.css';
import '../libs/nuwebcomm-scripts.js';

const Layout = () => {
  return (
    <div>
      <Header />
      <Nav />
      <GlobalSearch />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={HomeContainer} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Layout;
