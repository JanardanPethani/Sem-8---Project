import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store/store'

import './styles/App.css'

import Footer from './components/layout/Footer/Footer'
import Landing from './components/layout/LandingPage/Landing'
import Navbar from './components/layout/Navbar/Navbar'
import Login from './components/auth/Login/Login'
import Register from './components/auth/Register/Register'
import Alert from './components/layout/Alert/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import Request from './components/request/RequestForm'
import RequestPage from './components/request/RequestPage'
import OfferPage from './components/offer/OfferPage'
import EditProfile from './components/profile/EditProfile'
import ForgotPassword from './components/auth/PasswordRecovery/ForgotPassword'
import PasswordRecover from './components/auth/PasswordRecovery/PasswordRecover'

import { loadUser } from './store/actions/auth'
import setAuthToken from './utils/setAuthToken'
import Offer from './components/offer/OfferForm'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  //When the state update it will keep looping to stop, [] is provided to run once
  //this tells reacts that effect doesn't depend on any values
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgotPassword' component={ForgotPassword} />
              <Route exact path='/passwordRecovery' component={PasswordRecover} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/request' component={Request} />
              <PrivateRoute exact path='/requestpage' component={RequestPage} />
              <PrivateRoute exact path='/offer' component={Offer} />
              <PrivateRoute exact path='/offerpage' component={OfferPage} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            </Switch>
          </section>
          <Footer></Footer>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App
