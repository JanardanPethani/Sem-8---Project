import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import { checkUser } from '../../../store/actions/auth'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Paper, TextField } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

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
const ForgotPassword = ({ checkUser, history }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    email: '',
  })

  const { email } = formData

  const onChange = (e) => setFormData({ [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    checkUser(email, history)
  }

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Paper className={classes.paper} elevation={3}>
          <Typography variant='h5'>Enter email</Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <TextField
                variant='outlined'
                required
                fullWidth
                autoFocus
                type='email'
                label='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Send OTP' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </Paper>
      </Container>
    </Fragment>
  )
}

ForgotPassword.propTypes = {
  checkUser: PropTypes.func.isRequired,
}

export default connect(null, { checkUser })(withRouter(ForgotPassword))
