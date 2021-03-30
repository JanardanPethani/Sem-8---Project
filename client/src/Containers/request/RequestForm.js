import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendRequest, matchRides, sendMsg } from '../../store/actions/request'

import GMap from '../layout/GoogleMap/Map'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MatchCard from '../../Components/MatchCard/MatchCard'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1),
  },
  backBtn: {
    margin: theme.spacing(3, 'auto'),
  },
}))

const RequestForm = ({ history, matchRides, matchesArray, sendMsg }) => {
  const classes = useStyles()

  // Steps
  const [step, setStep] = useState(0)

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departAt: '',
  })

  const [getMatch, setMatch] = useState(false)

  const { from, to, departAt } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // className='relative h-96  shadow-lg rounded-lg overflow-hidden'
  // className='relative mt-5 mb-5 shadow-lg p-4 rounded-lg'

  return (
    <Fragment>
      <h1 className='large text-primary'>Request a ride</h1>
      <Grid spacing={1}>
        <Grid>
          <GMap />
          <span className='bg-yellow-100 p-1 text-sm rounded-md'>
            Click on map to add marker/Click on marker to see location
          </span>
        </Grid>

        <Grid>
          <Paper elevation={3} className={classes.paper}>
            <CssBaseline />
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                {step === 0 ? (
                  <Fragment>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id='outlined-basic'
                        label='Pickup Location'
                        required
                        fullWidth
                        variant='outlined'
                        name='from'
                        value={from}
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id='outlined-basic'
                        required
                        fullWidth
                        label='Destination Location'
                        variant='outlined'
                        name='to'
                        value={to}
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant='outlined'
                        
                        onClick={() => setStep(1)}
                      >
                        Next
                      </Button>
                    </Grid>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          format='MM/dd/yyyy'
                          value={selectedDate}
                          onChange={handleDateChange}
                          minDate={new Date()}
                          onChange={(e) => onChange(e)}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant='outlined'
                        
                        onClick={() => setStep(0)}
                      >
                        Back
                      </Button>
                    </Grid>
                  </Fragment>
                )}
              </Grid>
            </form>
          </Paper>
          <Button variant='outlined' className={classes.backBtn}>
            <Link to='/dashboard'>Go Back</Link>
          </Button>
        </Grid>

        <Grid className='flex max-w-full'>
          {step === 1 ? (
            <Fragment>
              {!getMatch ? (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setMatch(true)
                    if (!getMatch) {
                      matchRides(from)
                    }
                  }}
                >
                  Get Matching Offers
                </button>
              ) : (
                ''
              )}
              {getMatch ? (
                <div className='text-center container my-5 mx-auto px-4 md:px-12'>
                  <button
                    onClick={() => {
                      setMatch(false)
                    }}
                  >
                    <i className='fas fa-times-circle text-3xl'></i>
                  </button>
                  <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                    {matchesArray.length !== 0 ? (
                      <MatchCard
                        array={matchesArray}
                        send={sendMsg}
                        showButton={false}
                      />
                    ) : (
                      'No matches'
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
            </Fragment>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Fragment>
  )
}

RequestForm.propTypes = {
  sendRequest: PropTypes.func.isRequired,
  matchRides: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired,
  matchesArray: PropTypes.array,
}

const mapStateToProps = (state) => ({
  matchesArray: state.profile.currRequestMatches,
})

export default connect(mapStateToProps, { sendRequest, matchRides, sendMsg })(
  withRouter(RequestForm)
)
