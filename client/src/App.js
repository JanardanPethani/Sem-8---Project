import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/layout/LandingPage/Landing';
import Navbar from './components/layout/Navbar/Navbar';

const App = () => (
  < Router >
    <Fragment>
      <Navbar></Navbar>
      <Route exact path='/' component={Landing} />
      <Footer></Footer>
    </Fragment>
  </Router >
);
export default App;
