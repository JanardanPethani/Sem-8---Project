import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Container, Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

// Actions
import { editProfile } from '../../store/actions/profile'
import { loadUser } from '../../store/actions/auth'

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
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}))

const EditProfile = ({ editProfile, auth: { user, loading }, history }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    age: '',
  })

  const [imgData, setimgData] = useState(null)
  const [mainUploadData, setMainUploadData] = useState(null)

  useEffect(() => {
    if (!user) loadUser()
    setFormData({
      firstname: loading || !user.firstname ? '' : user.firstname,
      lastname: loading || !user.lastname ? '' : user.lastname,
      email: loading || !user.email ? '' : user.email,
      phone: loading || !user.phone ? '' : user.phone,
      age: loading || !user.age ? '' : user.age,
    })

    setimgData(
      loading || !user.profileImage
        ? ''
        : 'http://localhost:5000/' +
            user.profileImage.replace('src\\uploads\\', 'uploads/')
    )
    setMainUploadData(
      loading || !user.profileImage
        ? ''
        : 'http://localhost:5000/' +
            user.profileImage.replace('src\\uploads\\', 'uploads/')
    )
  }, [loading, user])

  const { firstname, lastname, phone, email, age } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhoto = (e) => {
    setMainUploadData(e.target.files[0])
    setimgData(URL.createObjectURL(e.target.files[0]))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const photoData = new FormData()
    photoData.append('profileImage', mainUploadData)
    //update-profile
    axios
      .post('http://localhost:3000/api/user/photo/', photoData, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))

    editProfile(formData, history)
  }
  //   console.log(imgData)
  return (
    <Fragment>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Paper className={classes.paper} elevation={3}>
          <form
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            encType='multipart/form-data'
          >
            <Grid container>
              <Grid
                item
                xs={6}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar alt='dp' src={imgData} className={classes.large} />
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  name='image'
                  onChange={handlePhoto}
                />
              </Grid>
            </Grid>
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
              //   margin='normal'
              type='email'
              label='Email'
              name='email'
              value={email}
              variant='outlined'
              onChange={(e) => onChange(e)}
              required
              fullWidth
              //   disabled
            />

            <Grid container style={{ marginTop: '2%' }}>
              <Grid item>
                <Button type='submit' color='primary' variant='contained'>
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Link to='/dashboard' className='btn mx-2'>
                  Go Back
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Typography
          variant='body2'
          style={{ color: 'gray', textAlign: 'center' }}
        >
          Refresh to load old values
        </Typography>
      </Container>
    </Fragment>
  )
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  // auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { editProfile, loadUser })(
  withRouter(EditProfile)
)
