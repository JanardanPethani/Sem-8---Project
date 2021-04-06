import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RequestCard from '../../Components/RequestSentCard/RequestCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { deleteReqMsg } from '../../store/actions/request'
import getTimeInfo from '../../utils/getTimeInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
}))

const useStylesCard = makeStyles({
  root: {
    minWidth: 275,
    margin: '5px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const SentReqs = ({ sentRequest, history, deleteReqMsg }) => {
  const classes = useStyles()
  const cardC = useStylesCard()
  // console.log(sentRequest)

  const requests = sentRequest.map((msg, index) => (
    <Fragment>
      <RequestCard msg={msg} deleteMsg={deleteReqMsg} />
    </Fragment>
  ))

  return (
    <Fragment>
      <h2 className='p-3 text-xl font-medium'>Requests Sent</h2>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <img src='Request.svg' style={{ width: '100%', height: 'auto' }} />
      </Grid>
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
