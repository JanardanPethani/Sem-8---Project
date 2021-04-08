import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store/store'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
import Offer from './Containers/offer/OfferForm'
import EditProfile from './Containers/profile/EditProfile'
import ForgotPassword from './Containers/auth/PasswordRecovery/ForgotPassword'
import PasswordRecover from './Containers/auth/PasswordRecovery/PasswordRecover'
import History from './Containers/History/History'
import NotFound from './Containers/layout/NotFound/Error'

import { loadUser } from './store/actions/auth'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '6rem',
  },
}))

const App = () => {
  const classes = useStyles()

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
          {/* <Container className={classes.root}> */}
            <Alert />
            <Switch>
              <Route exact path='/' component={Landing} />
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
              <PrivateRoute exact path='/offer' component={Offer} />
              <PrivateRoute exact path='/history' component={History} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <Route component={NotFound} />
            </Switch>
          {/* </Container> */}
          <Footer></Footer>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App
