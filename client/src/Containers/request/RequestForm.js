import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendRequest, matchRides } from '../../store/actions/request'

import GMap from '../layout/GoogleMap/Map'

import { makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MatchCards from '../../Components/MatchCard/MatchCard'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 150,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1),
  },
  btn: {
    backgroundColor: '#17a2b8',
    color: 'white',
  },
}))

const RequestForm = ({ history, matchRides, matchesArray }) => {
  const classes = useStyles()

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date())
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    seats: '',
  })

  const [getMatch, setMatch] = useState(false)

  const { from, to, seats } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <Grid container>
        <Grid xs={11}>
          <h1 className='large text-primary'>Request a ride</h1>
        </Grid>
        <Grid
          xs={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link to='/dashboard'>
            <CancelIcon fontSize='large' />
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>Map</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid style={{ width: '100%' }}>
                <Paper>
                  <GMap />
                </Paper>
                <span className='bg-yellow-100 p-1 text-sm rounded-md'>
                  Click on map to add marker/Click on marker to see location
                </span>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs>
          <Paper elevation={1} className={classes.paper}>
            <CssBaseline />
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-basic'
                    label='Pickup Location'
                    required
                    fullWidth
                    variant='outlined'
                    name='from'
                    value={from}
                    helperText='Enter full address with city and state'
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
                    helperText='Enter full address with city and state'
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant='outlined'
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor='outlined'>Seats</InputLabel>
                    <Select
                      labelId='outlined'
                      id='outlined'
                      value={seats}
                      onChange={(e) => onChange(e)}
                      name='seats'
                      label='Seats'
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>One</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                      <MenuItem value={4}>Four</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: '1rem' }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format='MM/dd/yyyy'
                      name={selectedDate}
                      value={selectedDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          {from && to ? (
            <Fragment>
              {!getMatch ? (
                <Grid
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    className={classes.btn}
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setMatch(true)
                      if (!getMatch) {
                        matchRides(from)
                      }
                    }}
                  >
                    Get Matching Offers
                  </Button>
                </Grid>
              ) : (
                ''
              )}
              {getMatch ? (
                <Grid item>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      className={classes.btn}
                      variant='contained'
                      color='primary'
                      onClick={() => {
                        setMatch(false)
                      }}
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={2}
                      xs={12}
                      sm={12}
                      style={{ marginTop: '1rem' }}
                    >
                      {matchesArray.length !== 0 ? (
                        <MatchCards array={matchesArray} showButton={false} />
                      ) : (
                        <Grid xs={12}>
                          <img
                            src='./imgs/NoRide.png'
                            alt='No ride'
                            style={{
                              margin: 'auto',
                              width: '20%',
                              height: 'auto',
                            }}
                          />
                          <Typography
                            variant='h5'
                            style={{
                              textAlign: 'center',
                              marginTop: '2rem',
                              fontWeight: '500',
                              color: 'rgb(5, 71, 82)',
                            }}
                          >
                            No rides yet. Drivers usually publish their ride 2-3
                            days before departure.
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
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
  matchesArray: PropTypes.array,
}

const mapStateToProps = (state) => ({
  matchesArray: state.profile.currRequestMatches,
})

export default connect(mapStateToProps, { sendRequest, matchRides })(
  withRouter(RequestForm)
)
