import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../../Components/Spinner/Spinner'
import DashboardActions from './DashboardActions'
import Requests from './Requests'
import Offers from './Offers'
import SentReqs from './RequestSentByYou'
import ReceReqs from './RequestSentToYou'
import ActiveRide from './ActiveRides'

import { getCurrentProfile } from '../../store/actions/profile'
import { deleteUser } from '../../store/actions/auth'

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading, activeRideP, activeRideD },
  deleteUser,
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return loading && profile && auth.loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='max-w-md mx-auto bg-white shadow-lg p-2 rounded-lg overflow-hidden  text-center'>
        <div className='p-5'>
          <div className='uppercase tracking-wide font-bold'>Welcome </div>
          <p className='mt-2 text-800 font-bold leading-relaxed'>
            {auth.user && auth.user.firstname + ' ' + auth.user.lastname}
          </p>
        </div>
      </div>

      {profile !== null &&
      (profile.req.length !== 0 ||
        profile.off.length !== 0 ||
        profile.send.length !== 0 ||
        profile.received.length !== 0) ? (
        <Fragment>
          <DashboardActions />

          <ActiveRide activeRide={activeRideD} />
          <ActiveRide activeRide={activeRideP} />
          <div className=' bg-white shadow-sm p-2 mb-3 mt-1 rounded-lg overscroll-x-contain'>
            <Requests request={profile.req} />
            <div className='border-b-2'></div>
            <SentReqs sentRequest={profile.send} />
          </div>
          <div className=' bg-white shadow-sm p-2 mb-3 mt-1 rounded-lg overscroll-x-contain'>
            <Offers offer={profile.off} />
            <div className='border-b-2'></div>
            <ReceReqs receRequest={profile.received} />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
          <br />
          <p className='max-w-md mx-auto mt-2 text-center text-500 leading-relaxed'>
            You have not requested / offered a ride
          </p>
        </Fragment>
      )}
      <div className='justify-center flex mt-8 pb-8'>
        <button
          className='btn btn-danger p-2 rounded'
          onClick={() => deleteUser()}
        >
          <i className='fas fa-user-minus'></i> Delete Account
        </button>
      </div>
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteUser })(
  Dashboard
)
