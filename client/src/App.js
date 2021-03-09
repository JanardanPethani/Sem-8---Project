import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store'

import './App.css';

import Footer from './components/layout/Footer/Footer';
import Landing from './components/layout/LandingPage/Landing';
import Navbar from './components/layout/Navbar/Navbar';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Alert from './components/layout/Alert/Alert'

const App = () => (
  <Provider store={store}>
    < Router >
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
        <Footer></Footer>
      </Fragment>
    </Router >
  </Provider>
);

export default App;
