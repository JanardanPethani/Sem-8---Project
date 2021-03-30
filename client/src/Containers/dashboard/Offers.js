import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { deleteOff } from '../../store/actions/offer'
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
}))

const useStylesCard = makeStyles({
  root: {
    minWidth: 275,
    margin: '5px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const Offers = ({ offer, deleteOff, history }) => {
  const classes = useStyles()
  const cardC = useStylesCard()
  const offers = offer.map((off, index) => (
    <Grid key={index} item>
      <Card className={cardC.root} variant='outlined'>
        <CardContent>
          <Typography
            className={cardC.title}
            color='textSecondary'
            gutterBottom
          >
            From : {off.from.slice(0, 20) + ' ...'}
          </Typography>
          <Typography
            className={cardC.title}
            color='textSecondary'
            gutterBottom
          >
            To : {off.to.slice(0, 10) + ' ...'}
          </Typography>
          <Typography className={cardC.pos} color='textSecondary'>
            {getTimeInfo(off.departAt)}
          </Typography>
        </CardContent>
        <Grid item container>
          <Grid xs={6}>
            <Paper
              elevation={2}
              style={{ cursor: 'pointer' }}
              className={classes.paper}
              onClick={() =>
                history.push({
                  pathname: '/offerpage',
                  state: { offId: off._id },
                })
              }
            >
              Info
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper
              elevation={2}
              style={{ cursor: 'pointer', color: 'red' }}
              className={classes.paper}
              onClick={() => {
                deleteOff(off._id)
              }}
            >
              Cancel
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  ))

  return (
    <Fragment>
      <h2 className='p-3 text-xl font-medium'>All Offers</h2>

      <Grid item xs={12} className={classes.root} spacing={5}>
        <Grid container>{offers}</Grid>
      </Grid>
    </Fragment>
  )
}

Offers.propTypes = {
  offer: PropTypes.array.isRequired,
}

export default connect(null, { deleteOff })(withRouter(Offers))
