import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

import Footer from './components/layout/Footer/Footer';
import Landing from './components/layout/LandingPage/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

const App = () => (
  < Router >
    <Fragment>
      <Navbar></Navbar>
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
      <Footer></Footer>
    </Fragment>
  </Router >
);
export default App;
