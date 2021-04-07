import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'

// import './Landing.css'

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Grid container spacing={3}>
      <Grid
        xs={12}
        item
        style={{
          marginTop: '5rem',
          marginBottom: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src='Road.svg'
          style={{ width: '80%', height: 'auto' }}
          alt='Main img'
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='dash-buttons'>
          <Link to='/register' className='btn btn-primary'>
            Sign Up
          </Link>
          <Link to='/login' className='btn btn-light'>
            Login
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(Landing)
