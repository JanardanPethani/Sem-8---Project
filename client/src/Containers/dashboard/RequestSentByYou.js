import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RequestCard from '../../Components/RequestSentCard/RequestCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { deleteReqMsg } from '../../store/actions/request'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
}))

const SentReqs = ({ sentRequest, history, deleteReqMsg }) => {
  const classes = useStyles()
  // console.log(sentRequest)

  const requests = sentRequest.map((msg, index) => (
    <Fragment>
      <RequestCard msg={msg} deleteMsg={deleteReqMsg} />
    </Fragment>
  ))

  return (
    <Fragment>
      <h2 className='p-3 text-xl font-medium'>Requests Sent</h2>

      <Grid item xs={12} className={classes.root} spacing={5}>
        <Grid container>{requests}</Grid>
      </Grid>
    </Fragment>
  )
}

SentReqs.propTypes = {
  deleteReqMsg: PropTypes.func.isRequired,
}

export default connect(null, { deleteReqMsg })(withRouter(SentReqs))
