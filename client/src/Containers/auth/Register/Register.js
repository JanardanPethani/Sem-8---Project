import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Container, Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

// Actions
import { setAlert } from '../../../store/actions/alert'
import { register } from '../../../store/actions/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#17a2b8',
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#17a2b8',
  },
}))

// props is destructured into ({setAlert, ... })
const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    age: 18,
    password: '',
    confirmPassword: '',
  })

  const {
    firstname,
    lastname,
    phone,
    email,
    age,
    password,
    confirmPassword,
  } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      // this wil call setAlert action
      setAlert('Passwords do not match', 'danger', 2000)
    } else {
      register({ firstname, lastname, age, phone, email, password })
      // console.log(formData);
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>

          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin='normal'
                  type='text'
                  label='First Name'
                  name='firstname'
                  value={firstname}
                  variant='outlined'
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin='normal'
                  type='text'
                  label='Last Name'
                  name='lastname'
                  value={lastname}
                  variant='outlined'
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin='normal'
                  type='tel'
                  label='Phone number'
                  name='phone'
                  value={phone}
                  variant='outlined'
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin='normal'
                  type='number'
                  label='age'
                  name='age'
                  value={age}
                  variant='outlined'
                  helperText='Between 18 to 50'
                  inputProps={{ min: '18', max: '50', step: '1' }}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              margin='normal'
              type='email'
              label='Email'
              name='email'
              value={email}
              variant='outlined'
              onChange={(e) => onChange(e)}
              required
              fullWidth
              // autoComplete="false"
            />
            <TextField
              margin='normal'
              type='password'
              label='Password'
              name='password'
              value={password}
              variant='outlined'
              helperText='Length must be greater than 5'
              onChange={(e) => onChange(e)}
              required
              fullWidth
              // autoComplete="false"
            />
            <TextField
              margin='normal'
              type='password'
              label='Confirm password'
              name='confirmPassword'
              value={confirmPassword}
              variant='outlined'
              onChange={(e) => onChange(e)}
              required
              fullWidth
              // autoComplete="false"
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                {'Already have an account? '}
                <Link to='/login' className='my-link'>
                  <b>Sign In</b>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { setAlert, register })(Register)
