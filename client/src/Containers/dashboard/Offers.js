import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import OfferCard from '../../Components/OfferCard/OfferCard'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { deleteOff } from '../../store/actions/offer'
import getTimeInfo from '../../utils/getTimeInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    <Fragment key={index}>
      <OfferCard offData={off} deleteOffer={deleteOff} />
    </Fragment>
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
