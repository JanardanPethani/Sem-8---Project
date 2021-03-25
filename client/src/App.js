import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store/store'

import './styles/App.css'

import Footer from './Containers/layout/Footer/Footer'
import Landing from './Containers/layout/LandingPage/Landing'
import Navbar from './Containers/layout/Navbar/Navbar'
import Login from './Containers/auth/Login/Login'
import Register from './Containers/auth/Register/Register'
import Alert from './Containers/layout/Alert/Alert'
import Dashboard from './Containers/dashboard/Dashboard'
import PrivateRoute from './Containers/routing/PrivateRoute'
import Request from './Containers/request/RequestForm'
import RequestPage from './Containers/request/RequestPage'
import Offer from './Containers/offer/OfferForm'
import OfferPage from './Containers/offer/OfferPage'
import EditProfile from './Containers/profile/EditProfile'
import ForgotPassword from './Containers/auth/PasswordRecovery/ForgotPassword'
import PasswordRecover from './Containers/auth/PasswordRecovery/PasswordRecover'
import History from './Containers/History/History'

import { loadUser } from './store/actions/auth'
import setAuthToken from './utils/setAuthToken'

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
              <Route
                exact
                path='/passwordRecovery'
                component={PasswordRecover}
              />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/request' component={Request} />
              <PrivateRoute exact path='/requestpage' component={RequestPage} />
              <PrivateRoute exact path='/offer' component={Offer} />
              <PrivateRoute exact path='/offerpage' component={OfferPage} />
              <PrivateRoute exact path='/history' component={History} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
          <Footer></Footer>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App
