import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { Container, Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

import { login } from '../../../store/actions/auth'
import './Login.css'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#17a2b8',
  },
}))

// destructured props ↘
const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  // Redirect after login
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <TextField
              margin='normal'
              type='email'
              label='Email Address'
              name='email'
              value={email}
              variant='outlined'
              onChange={(e) => onChange(e)}
              required
              fullWidth
              autoFocus
            />

            <TextField
              margin='normal'
              type='password'
              label='Password'
              name='password'
              value={password}
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/forgotPassword' className='my-link'>
                  <b>Forgot password?</b>
                </Link>
              </Grid>
              <Grid item>
                {"Don't have an account? "}
                <Link to='/register' className='my-link'>
                  <b>Sign Up</b>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
