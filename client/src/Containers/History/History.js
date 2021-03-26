import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../../Components/Spinner/Spinner'
import HistoryCard from '../../Components/HistoryCard/HistoryCard'

import { getCurrentProfile } from '../../store/actions/profile'

const History = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <HistoryCard data={profile.history} />
    </Fragment>
  )
}

History.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(History)
