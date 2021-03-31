import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../../Components/Spinner/Spinner'
// import Requests from './Requests'
import Offers from './Offers'
import SentReqs from './RequestSentByYou'
import ReceReqs from './RequestSentToYou'
import ActiveRide from './ActiveRides'

import { getCurrentProfile } from '../../store/actions/profile'
import { deleteUser } from '../../store/actions/auth'
import { Grid, Paper } from '@material-ui/core'

const getChoice = (choice, data) => {
  switch (choice) {
    case 'Offers':
      return <Offers offer={{ ...data }} />
    case 'Requests':
      return <ReceReqs receRequest={{ ...data }} />
    case 'SentRequests':
      return <SentReqs sentRequest={{ ...data }} />
    default:
      return ''
  }
}

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading, activeRideP, activeRideD },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const [choice, setChoice] = useState('offers')

  return loading && profile && auth.loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null &&
      (profile.req.length !== 0 ||
        profile.off.length !== 0 ||
        profile.send.length !== 0 ||
        profile.received.length !== 0) ? (
        <Fragment>
          <ActiveRide activeRide={activeRideD} />
          <ActiveRide activeRide={activeRideP} />
          <SentReqs sentRequest={profile.send} />
          <Offers offer={profile.off} />
          <ReceReqs receRequest={profile.received} />
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
