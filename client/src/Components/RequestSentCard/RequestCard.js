import React, { Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

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

const SentReqs = ({ deleteMsg, msg }) => {
  const classes = useStyles()
  const cardC = useStylesCard()
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let profilePic = ''
  if (msg.to.profileImage) {
    profilePic =
      'http://localhost:5000/' +
      msg.to.profileImage.replace('src\\uploads\\', 'uploads/')
  } else {
    profilePic = ''
  }
  //   const requests = sentRequest.map((msg, index) => (
  const data = (
    <Fragment>
      <Grid item>
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
              To : {msg.forWhich.to.slice(0, 20) + ' ...'}
            </Typography>
            <Typography
              className={cardC.title}
              color='textSecondary'
              gutterBottom
            >
              To Whom : {msg.to.firstname}
            </Typography>
            <Typography className={cardC.pos} color='textSecondary'>
              {getTimeInfo(msg.created_at)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleClickOpen()}
              style={{ color: '#054752' }}
            >
              Info
            </Button>

            <Button
              onClick={() => {
                deleteMsg(msg._id)
              }}
              style={{ color: 'red' }}
            >
              Cancle Request
            </Button>
          </CardActions>
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
            <Grid
              item
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>To Whom : </Typography>
            </Grid>
            <Grid item xs={10}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label={msg.to.firstname}
                    src={profilePic}
                    className={classes.avatar}
                  >
                    {msg.to.firstname[0]}
                  </Avatar>
                }
                title={`${msg.to.firstname} ${msg.to.lastname}`}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography>From : </Typography>
            </Grid>
            <Grid item xs={10}>
              {msg.forWhich.from}{' '}
            </Grid>
            <Grid item xs={2}>
              <Typography>To : </Typography>
            </Grid>
            <Grid item xs={10}>
              {msg.forWhich.to}{' '}
            </Grid>

            <Grid item xs={4}>
              <Typography>Departure Time :</Typography>
            </Grid>
            <Grid item xs={8}>
              {msg.forWhich.departAt}{' '}
            </Grid>
            <br />
            <Grid item xs={4}>
              Vehicle : {msg.forWhich.vehicletype}
            </Grid>
            <Grid item xs={4}>
              Seats : {msg.forWhich.seats}{' '}
            </Grid>
            <Grid item xs={4}>
              Price : {msg.forWhich.price}
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

  return <Grid container>{data}</Grid>
}

export default SentReqs
