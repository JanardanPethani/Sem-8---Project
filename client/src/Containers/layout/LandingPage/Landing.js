import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'

import './LandingPage.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: '100%',
  },
  control: {
    padding: theme.spacing(2),
  },
}))

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles()

  return (
    <Fragment>
      {/* 1 part - signin/signup */}
      <Paper className='first-div' elevation={0}>
        <Typography variant='h2' className='heading'>
          {' '}
          Your partner for quick rides
        </Typography>
        <Box className='first-div-btn'>
          {!isAuthenticated ? (
            <Fragment>
              <Link to='/register' className='mBtn btnPrimary'>
                Sign Up
              </Link>
              <Link to='/login' className='mBtn btnPrimary'>
                Login
              </Link>
            </Fragment>
          ) : (
            <Link to='/dashboard' className='btn btn-primary'>
              Go to Dashboard
            </Link>
          )}
        </Box>
        <img src='./svgs/Order_ride.svg' className='svg_1' />
      </Paper>

      {/* 2 part - Search ride */}
      <Grid container style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Grid item xs={12} sm={4} style={{ padding: '2rem' }}>
          <Typography
            variant='h1'
            style={{
              color: '#17a2b8',
            }}
          >
            Search rides
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img className='img-w' src='./svgs/Request.svg' alt='Request' />
        </Grid>
      </Grid>

      {/* 3 part - Offer ride */}
      <Grid
        container
        style={{
          marginTop: '3rem',
          marginBottom: '4rem',
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img className='img-w' src='./svgs/Offer.svg' alt='Offer' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant='h1'
            style={{ padding: '2rem', color: '#17a2b8' }}
          >
            Offer rides
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(Landing)
