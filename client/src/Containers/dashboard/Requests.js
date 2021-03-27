import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Paper from '@material-ui/core/Paper'

import { deleteReq } from '../../store/actions/request'
import getTimeInfo from '../../utils/getTimeInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const Requests = ({ request, deleteReq, history }) => {

  const classes = useStyles()
  const cardC = useStylesCard()

  const requests = request.map((req, index) => (
    // <tr key={req._id} className='hover:bg-gray-100'>
    //   <td>{index + 1}</td>
    //   <td>{req.from.slice(0, 10) + ' ...'}</td>
    //   <td>{req.to.slice(0, 10) + ' ...'}</td>
    //   <td>{getTimeInfo(req.departAt)}</td>
    //   <td>
    //     <button
    //       className='btn btn-primary'
    //       onClick={() =>
    //         history.push({
    //           pathname: '/requestpage',
    //           state: { reqId: req._id },
    //         })
    //       }
    //     >
    //       <i className='fas fa-info-circle'></i>
    //     </button>
    //   </td>
    //   <td>
    //     <button
    //       className='btn btn-danger'
    //       onClick={() => {
    //         deleteReq(req._id)
    //       }}
    //     >
    //       <i className='fas fa-trash-alt'></i>
    //     </button>
    //   </td>
    // </tr>
    <Grid key={index}>
      <Card className={cardC.root} variant='outlined'>
        <CardContent>
          <Typography
            className={cardC.title}
            color='textSecondary'
            gutterBottom
          >
            From : {req.from.slice(0, 20) + ' ...'}
          </Typography>
          <Typography
            className={cardC.title}
            color='textSecondary'
            gutterBottom
          >
            To : {req.to.slice(0, 20) + ' ...'}
          </Typography>
          <Typography className={cardC.pos} color='textSecondary'>
            {getTimeInfo(req.departAt)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() =>
              history.push({
                pathname: '/requestpage',
                state: { reqId: req._id },
              })
            }
          >
            <i className='fas fa-info-circle'></i>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))

  return (
    <Fragment>
      <h2 className='p-6 text-xl font-medium'>All Requests</h2>
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12}>
          <Grid container>{requests}</Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

Requests.propTypes = {
  request: PropTypes.array.isRequired,
}

export default connect(null, { deleteReq })(withRouter(Requests))
