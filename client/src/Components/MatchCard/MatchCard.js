import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { sendMsg } from '../../store/actions/request'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import { red } from '@material-ui/core/colors'
import Icon from '@material-ui/core/Icon'
import getStatus from '../../utils/getStatus'
import getTimeInfo from '../../utils/getTimeInfo'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const MatchCard = ({ array, sendMsg }) => {
  const classes = useStyles()
  return (
    <Fragment>
      {array.map((ride) => {
        const status = getStatus(ride.departAt)
        const postTime = getTimeInfo(ride.created_at)
        const name = `${ride.offBy.firstname} ${ride.offBy.lastname}`
        return (
          <Grid item xs={12} sm={6}>
            <Card key={ride._id}>
              {/* <article className='overflow-hidden rounded-lg shadow-lg'> */}
              <Grid container>
                <Grid item xs>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label={ride.offBy.firstname}
                        src={
                          'http://localhost:5000/' +
                          ride.offBy.profileImage.replace(
                            'src\\uploads\\',
                            'uploads/'
                          )
                        }
                        className={classes.avatar}
                      >
                        {ride.offBy.firstname[0]}
                      </Avatar>
                    }
                    title={name}
                    subheader={postTime}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography gutterBottom variant='h6'>
                    {ride.price} ₹
                  </Typography>
                </Grid>
              </Grid>
              <CardContent>
                <List component='nav'>
                  <ListItem>
                    <Typography variant='body2'>From : {ride.from}</Typography>
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <Typography variant='body2'>To : {ride.to}</Typography>
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <Typography variant='body2'>
                      Phone : {ride.offBy.phone}
                    </Typography>
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <Typography variant='body2'>
                      Leaving At : {ride.departAt}
                    </Typography>
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <Typography variant='body2'>Status : {status}</Typography>
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <Typography variant='body2'>
                      Seats Offered :{' '}
                      {ride.vehicletype === 'car' ? (
                        <i className='fas fa-car'></i>
                      ) : (
                        <i className='fas fa-motorcycle'></i>
                      )}{' '}
                      - {ride.seats}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>

              {/* buttons */}
              <CardActions>
                {status.props.children !== 'Expired' ? (
                  <Button
                    fullWidth
                    endIcon={<Icon>send</Icon>}
                    onClick={() => {
                      sendMsg({
                        email: ride.offBy.email,
                        to: ride.offBy._id,
                        forWhich: ride._id,
                        from: ride.from,
                        destination: ride.to,
                        type: ride.vehicletype,
                      })
                    }}
                  >
                    Send Request
                  </Button>
                ) : (
                  <Button fullWidth color='secondary'>
                    Departed
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Fragment>
  )
}

MatchCard.propTypes = {
  sendMsg: PropTypes.func.isRequired,
}

export default connect(null, { sendMsg })(MatchCard)
