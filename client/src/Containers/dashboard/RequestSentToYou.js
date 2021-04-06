import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import { green } from '@material-ui/core/colors'

import { deleteReceMsg, acceptRide } from '../../store/actions/offer'
import getTimeInfo from '../../utils/getTimeInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: green[500],
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

const ReceReqs = ({ receRequest, history, deleteReceMsg, acceptRide }) => {
  const classes = useStyles()
  const cardC = useStylesCard()
  // console.log(receRequest)
  const requests = receRequest.map((msg, index) => (
    <Grid key={index} item>
      <Card className={cardC.root} variant='outlined'>
        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              src={
                'http://localhost:5000/' +
                msg.reqBy.profileImage.replace('src\\uploads\\', 'uploads/')
              }
              className={classes.avatar}
            />
          }
          title={`${msg.reqBy.firstname} ${msg.reqBy.lastname}`}
          subheader={msg.created_at.slice(0,25)}
        />
        <CardContent>
          <Typography
            className={cardC.title}
            color='textSecondary'
            gutterBottom
          >
            From : {msg.forWhich.from.slice(0, 20) + ' ...'}
          </Typography>
          <Typography
            className={cardC.title}
            color='textSecondary'
            gutterBottom
          >
            To : {msg.forWhich.to.slice(0, 20) + ' ...'}
          </Typography>
          <Typography className={cardC.pos} color='textSecondary' gutterBottom>
            Depart at : {getTimeInfo(msg.forWhich.departAt)}
          </Typography>
        </CardContent>
        <Grid item container>
          <Grid xs={6}>
            <Paper
              elevation={2}
              style={{ cursor: 'pointer', color: 'green' }}
              className={classes.paper}
              onClick={() => {
                acceptRide(msg._id)
              }}
            >
              <i className='fas fa-thumbs-up'></i>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper
              elevation={2}
              style={{ cursor: 'pointer', color: 'red' }}
              className={classes.paper}
              onClick={() => {
                deleteReceMsg(msg._id)
              }}
            >
              <i className='fas fa-thumbs-down'></i>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  ))

  return (
    <Fragment>
      <h2 className='p-3 text-xl font-medium'>Passengers Requests</h2>
      <Grid item xs={12} className={classes.root} spacing={5}>
        <Grid container>{requests}</Grid>
      </Grid>
    </Fragment>
  )
}

ReceReqs.propTypes = {
  deleteReceMsg: PropTypes.func.isRequired,
  acceptRide: PropTypes.func.isRequired,
}

export default connect(null, { deleteReceMsg, acceptRide })(
  withRouter(ReceReqs)
)
