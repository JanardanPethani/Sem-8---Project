import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core'

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
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      {/* 1 part - signin/signup */}
      <Paper className='first-div'>
        <Typography variant='h2' className='heading'>
          {' '}
          Your partner for quick rides
        </Typography>
        <Box className='first-div-btn'>
          <Link to='/register' className='btn btn-primary'>
            Sign Up
          </Link>
          <Link to='/login' className='btn btn-light'>
            Login
          </Link>
        </Box>
        <img src='./svgs/Order_ride.svg' className='svg_1' />
      </Paper>

      {/* 2 part - Search ride */}
      <Grid
        container
        style={{ borderBottom: '1px solid black', marginTop: '2rem' }}
      >
        <Grid item style={{ padding: '2rem' }}>
          <Typography variant='h1'>Search rides</Typography>
        </Grid>
      </Grid>

      {/* 3 part - Offer ride */}
      <Grid
        container
        style={{ borderBottom: '1px solid black', marginTop: '2rem' }}
      >
        <Grid item xs={8}>
          {' '}
        </Grid>
        <Grid item>
          <Typography
            variant='h1'
            style={{ padding: '2rem', marginBottom: '2rem' }}
          >
            Offer rides
          </Typography>
        </Grid>
      </Grid>
      <Paper></Paper>
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
