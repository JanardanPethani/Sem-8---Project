import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: green[500],
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}))

const ShortInfoCard = ({ profileData, user }) => {
  const classes = useStyles()
  let totalIncome = 0
  if (profileData.history.length > 0) {
    profileData.history.forEach((ride) => {
      if (ride.driverM == user.email) {
        totalIncome += ride.price
      }
    })
  }
  return (
    <Fragment>
      <Paper className={`${classes.paper}`} elevation={3}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                aria-label='recipe'
                src={
                  'http://localhost:5000/' +
                  user.profileImage.replace('src\\uploads\\', 'uploads/')
                }
                className={`${classes.avatar} ${classes.large}`}
              />
            </Grid>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>
                {user.firstname} {user.lastname}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={3}>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h2'>{profileData.history.length}</Typography>
            </Grid>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='body2'>Total completed rides</Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={3}>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h2'>{profileData.off.length}</Typography>
            </Grid>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='body2'>Current offers</Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={3}>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h2'>{totalIncome} ₹</Typography>
            </Grid>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='body2'>Total Earnings</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  )
}

export default ShortInfoCard
