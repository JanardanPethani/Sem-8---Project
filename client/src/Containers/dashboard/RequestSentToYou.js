import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { deleteReceMsg, acceptRide } from '../../store/actions/offer'
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

const ReceReqs = ({ receRequest, history, deleteReceMsg, acceptRide }) => {
  const classes = useStyles()
  const cardC = useStylesCard()
  // console.log(receRequest)
  const requests = receRequest.map((msg, index) => (
    // <tr key={msg._id} className='hover:bg-gray-100'>
    //   <td>{index + 1}</td>
    //   <td>{msg.forWhich.from.slice(0, 10) + ' ...'}</td>
    //   <td>{msg.reqBy.firstname}</td>
    //   <td>{getTimeInfo(msg.created_at)}</td>
    //   <td>
    //     <button
    //       className='btn btn-success'
    //       onClick={() => {
    //         acceptRide(msg._id)
    //         // history.push({
    //         //   pathname: '/currActiveRide',
    //         //   state: { reqId: msg._id },
    //         // })
    //       }}
    //     >
    //       <i className='fas fa-thumbs-up'></i>
    //     </button>
    //   </td>
    //   <td>
    //     <button
    //       className='btn btn-danger'
    //       onClick={() => {
    //         deleteReceMsg(msg._id)
    //       }}
    //     >
    //       <i className='fas fa-thumbs-down'></i>
    //     </button>
    //   </td>
    // </tr>
    <Grid key={index} item>
      <Card className={cardC.root} variant='outlined'>
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
            By : {msg.reqBy.firstname}
          </Typography>
          <Typography className={cardC.pos} color='textSecondary'>
            {getTimeInfo(msg.created_at)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              acceptRide(msg._id)
              history.push({
                pathname: '/currActiveRide',
                state: { reqId: msg._id },
              })
            }}
          >
            <i className='fas fa-thumbs-up'></i>
          </Button>
        </CardActions>
        <CardActions>
          <Button
            onClick={() => {
              deleteReceMsg(msg._id)
            }}
          >
            <i className='fas fa-thumbs-down'></i>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))

  return (
    <Fragment>
      <h2 className='p-6 text-xl font-medium'>Requests Sent To You</h2>
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
