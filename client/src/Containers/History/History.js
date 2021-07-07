import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../../Components/Spinner/Spinner'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HistoryCard from '../../Components/HistoryCard/HistoryCard'

import { getCurrentProfile } from '../../store/actions/profile'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootC: {
    marginTop: '2rem',
    marginBottom: '6rem',
  },
}))

const History = ({ getCurrentProfile, profile: { profile, loading } }) => {
  const classes = useStyles()

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container className={classes.rootC}>
        <HistoryCard data={profile.history} />
      </Container>
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
