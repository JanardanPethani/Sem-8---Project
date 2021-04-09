import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter, useLocation } from 'react-router-dom'

import { checkOtp, updatePassword } from '../../../store/actions/auth'
import { setAlert } from '../../../store/actions/alert'

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
const PasswordRecover = ({ checkOtp, updatePassword, history, setAlert }) => {
  const classes = useStyles()
  const location = useLocation()

  const [formData, setFormData] = useState({
    otp: '',
    isTrue: false,
  })
  const [passData, setPassData] = useState({
    password: '',
    confirmPassword: '',
  })

  const { otp, isTrue } = formData
  const { password, confirmPassword } = passData

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const onConfirm = (e) => {
    // console.log(e);

    setPassData({
      ...passData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault()
    // history.push('/login')
    const res = await checkOtp(otp, history)
    console.log(res)
    setFormData({ isTrue: res })
  }

  const onSubmitPass = (e) => {
    e.preventDefault()
    console.log(
      'Called on password submit and values: ',
      `${password}`,
      `${confirmPassword}`
    )
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger', 2000)
    } else {
      console.log('Password changed')
      updatePassword(location.state.id, password, history)
    }
  }

  return (
    <Fragment>
      {!isTrue ? (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Paper className={classes.paper} elevation={3}>
            <Typography className='large text-primary'>Enter Otp</Typography>
            <form className={classes.form} onSubmit={(e) => onSubmitOtp(e)}>
              <div className='form-group'>
                <TextField
                  type='number'
                  variant='outlined'
                  label='Enter Otp'
                  name='otp'
                  value={otp}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  autoFocus
                />
              </div>
              <input
                type='submit'
                className='btn btn-primary'
                value='Check Otp'
              />
              <Link className='btn btn-light my-1' to='/login'>
                Go Back
              </Link>
            </form>
          </Paper>
        </Container>
      ) : null}
      {isTrue ? (
        <Container>
          <CssBaseline />
          <Paper className={classes.paper} elevation={3}>
            <Typography className='large text-primary'>
              Enter new password
            </Typography>
            <form className={classes.form} onSubmit={(e) => onSubmitPass(e)}>
              <div className='form-group'>
                <TextField
                  variant='outlined'
                  type='password'
                  label='Password'
                  name='password'
                  value={password}
                  onChange={(e) => onConfirm(e)}
                  minLength='6'
                  required
                  fullWidth
                  autoFocus
                />
              </div>
              <div className='form-group'>
                <TextField
                  variant='outlined'
                  type='password'
                  label='Confirm Password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => onConfirm(e)}
                  minLength='6'
                  required
                  fullWidth
                />
              </div>
              <input
                type='submit'
                className='btn btn-primary'
                value='Confirm'
              />
              <Link className='btn btn-light my-1' to='/login'>
                Go Back
              </Link>
            </form>
          </Paper>
        </Container>
      ) : null}
    </Fragment>
  )
}

PasswordRecover.propTypes = {
  checkOtp: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
}

export default connect(null, { checkOtp, setAlert, updatePassword })(
  withRouter(PasswordRecover)
)
