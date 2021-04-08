import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendOffer } from '../../store/actions/offer'

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
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  rootC: {
    marginTop: '2rem',
    marginBottom: '6rem',
  },
  formControl: {
    minWidth: 150,
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
}))

const OfferForm = ({ sendOffer, history }) => {
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    price: '',
    seats: '',
    vehicletype: 'car',
  })

  const { from, to, price, seats, vehicletype } = formData
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newFormData = { ...formData, departAt: selectedDate }
    // console.log(newFormData)
    sendOffer(newFormData, history)
  }
  return (
    <Fragment>
      <Container className={classes.rootC}>
        <Grid container>
          <Grid xs={11}>
            <h1 className='large text-primary'>Offer a ride</h1>
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
        <Grid>
          <Grid>
            <Paper elevation={3}>
              <GMap />
            </Paper>
            <span className='bg-yellow-100 p-1 text-sm rounded-md'>
              Click on map to add marker/Click on marker to see location
            </span>
          </Grid>

          <Grid>
            <Paper elevation={3} className={classes.paper}>
              <CssBaseline />
              <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
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
                      helperText='Enter full address with city and state'
                      value={to}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id='outlined-basic'
                      type='number'
                      required
                      fullWidth
                      label='Price'
                      variant='outlined'
                      name='price'
                      value={price}
                      onChange={(e) => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormControl
                          variant='outlined'
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor='outlined'>Vehicle</InputLabel>
                          <Select
                            required
                            labelId='outlined'
                            id='outlined'
                            value={vehicletype}
                            onChange={(e) => onChange(e)}
                            name='vehicletype'
                            label='Seats'
                          >
                            <MenuItem value={'car'}>
                              <i className='fas fa-car'></i> Car
                            </MenuItem>
                            <MenuItem value={'bike'}>
                              {' '}
                              <i className='fas fa-motorcycle'></i> Bike
                            </MenuItem>
                          </Select>
                          <FormHelperText>*required</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl
                          variant='outlined'
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor='outlined'>Seats</InputLabel>
                          <Select
                            required
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
                          <FormHelperText>*required</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify='space-around'>
                        <Grid>
                          <KeyboardDatePicker
                            disableToolbar
                            margin='normal'
                            format='MM/dd/yyyy'
                            label='Date picker'
                            name={selectedDate}
                            value={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                          />
                        </Grid>
                        <Grid>
                          <KeyboardTimePicker
                            margin='normal'
                            label='Time picker'
                            name={selectedDate}
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                        </Grid>
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                    >
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}

OfferForm.propTypes = {
  sendOffer: PropTypes.func.isRequired,
}

export default connect(null, { sendOffer })(withRouter(OfferForm))
