import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Offers from './Offers'
import SentReqs from './RequestSentByYou'
import ReceReqs from './RequestSentToYou'
import ActiveRide from './ActiveRides'

import { getCurrentProfile } from '../../store/actions/profile'
import { Paper, Tab, Tabs, Box, CircularProgress } from '@material-ui/core'
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
    <CircularProgress color='inherit' />
  ) : (
    <Fragment>
      {profile !== null &&
      (profile.off.length !== 0 ||
        profile.send.length !== 0 ||
        profile.received.length !== 0) ? (
        <Fragment>
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
              <Tab label='Active Ride' {...a11yProps(3)} />
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
          <TabPanel value={value} index={3}>
            {activeRideD.length !== 0 ? (
              <ActiveRide activeRide={activeRideD} />
            ) : (
              <ActiveRide activeRide={activeRideP} />
            )}
          </TabPanel>
        </Fragment>
      ) : (
        <Fragment>
          <br />
          <p className='max-w-md mx-auto mt-2 text-center text-500 leading-relaxed'>
            You have not requested / offered a ride
          </p>
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
