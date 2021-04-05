import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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

const OfferCard = ({ offData, deleteOffer }) => {
  const classes = useStyles()
  const cardC = useStylesCard()
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Fragment>
      <Grid item>
        <Card className={cardC.root} variant='outlined'>
          <CardContent>
            <Typography
              className={cardC.title}
              color='textSecondary'
              gutterBottom
            >
              From : {offData.from.slice(0, 20) + ' ...'}
            </Typography>
            <Typography
              className={cardC.title}
              color='textSecondary'
              gutterBottom
            >
              To : {offData.to.slice(0, 10) + ' ...'}
            </Typography>
            <Typography className={cardC.pos} color='textSecondary'>
              {getTimeInfo(offData.departAt)}
            </Typography>
          </CardContent>
          <Grid item container>
            <Grid xs={6}>
              <Paper
                elevation={2}
                style={{ cursor: 'pointer' }}
                className={classes.paper}
                onClick={() => handleClickOpen()}
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
                  deleteOffer(offData._id)
                }}
              >
                Cancel
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Offer Information'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography>From : </Typography>
            </Grid>
            <Grid item xs={10}>
              {offData.from}{' '}
            </Grid>
            <Grid item xs={2}>
              <Typography>To : </Typography>
            </Grid>
            <Grid item xs={10}>
              {offData.to}{' '}
            </Grid>
            <Grid item xs={4}>
              <Typography>Departure Time :</Typography>
            </Grid>
            <Grid item xs={8}>
              {offData.departAt}{' '}
            </Grid>
            <br />
            <Grid item xs={4}>
              Vehicle : {offData.vehicletype}
            </Grid>
            <Grid item xs={4}>
              Seats : {offData.seats}{' '}
            </Grid>
            <Grid item xs={4}>
              Price : {offData.price}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default OfferCard
