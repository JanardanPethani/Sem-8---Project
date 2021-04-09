import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Offers from './Offers'
import SentReqs from './RequestSentByYou'
import ReceReqs from './RequestSentToYou'
import ActiveRide from './ActiveRides'
import ShortInfoCard from './ShortInfo'

import { getCurrentProfile } from '../../store/actions/profile'
import {
  Paper,
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootC: {
    marginTop: '2rem',
    marginBottom: '6rem',
  },
}))

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading, activeRideP, activeRideD },
}) => {
  const classes = useStyles()
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const [value, setChoice] = useState(0)
  const handleChange = (event, newValue) => {
    setChoice(newValue)
  }

  return loading || profile === null ? (
    <Container className={classes.rootC}>
      <CircularProgress color='inherit' />
    </Container>
  ) : (
    <Fragment>
      {profile !== null &&
      (profile.off.length !== 0 ||
        profile.send.length !== 0 ||
        profile.received.length !== 0 ||
        activeRideP.length !== 0 ||
        activeRideD.length !== 0) ? (
        <Fragment>
          <Container className={classes.rootC}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <ShortInfoCard profileData={profile} user={auth.user} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <Paper className={classes.root}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='scrollable'
                    scrollButtons='on'
                  >
                    <Tab label='Your Offers' {...a11yProps(0)} />
                    <Tab label='Requests received' {...a11yProps(1)} />
                    <Tab label='Requests Sent' {...a11yProps(2)} />
                  </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                  <Offers offer={profile.off} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ReceReqs receRequest={profile.received} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <SentReqs sentRequest={profile.send} />
                </TabPanel>
              </Grid>
              <Grid item xs={12} sm={5}>
                {activeRideD.length !== 0 ? (
                  <ActiveRide activeRide={activeRideD} />
                ) : (
                  <ActiveRide activeRide={activeRideP} />
                )}
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      ) : (
        <Fragment>
          <Container className={classes.rootC}>
            <Grid
              item
              xs={12}
              style={{
                marginBottom: '1rem',
              }}
            >
              <ShortInfoCard profileData={profile} user={auth.user} />
            </Grid>
            <Grid item>
              <Typography
                variant='h5'
                style={{
                  textAlign: 'center',
                  marginTop: '2rem',
                  fontWeight: '500',
                  color: 'rgb(5, 71, 82)',
                }}
              >
                No Request or Offer made.
              </Typography>
            </Grid>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
