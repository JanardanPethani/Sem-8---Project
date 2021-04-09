import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { logout } from '../../../store/actions/auth'
import { deleteUser } from '../../../store/actions/auth'

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  bgColor: {},
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: 20,
    color: 'black',
  },
}))

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  deleteUser,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const authLinks = (
    <Fragment>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <FormatListBulletedIcon />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to='/dashboard'>
            <i className='fas fa-user' /> Dashboard
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/edit-profile'>
            <i className='fas fa-user-circle '></i> Edit Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/history'>
            <i className='fas fa-history'></i> History
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            logout('all')
          }}
        >
          <i className='fas fa-sign-out-alt' /> Logout All
        </MenuItem>
        <MenuItem>
          <Button onClick={() => deleteUser()}>
            <span style={{ color: 'red' }}>Delete Account</span>
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )

  const guestLinks = ''

  return (
    // <div className={classes.root}>
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        {!loading ? (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        ) : null}
        <Typography className={classes.title}>
          <Link to='/'>Get Your Ride</Link>
        </Typography>

        <Button>
          <Link to='/request' style={{ color: 'black' }}>
            <i className='fas fa-route '></i>{' '}
            <span className='hide-sm'>Post a Request</span>
          </Link>
        </Button>
        <Button>
          <Link to='/offer' style={{ color: 'black' }}>
            <i className='fas fa-rupee-sign '></i>{' '}
            <span className='hide-sm'>Offer a ride</span>
          </Link>
        </Button>
        {!loading ? (
          <Fragment>
            {isAuthenticated ? (
              <Button onClick={() => logout()}>
                <i className='fas fa-sign-out-alt' /> Logout
              </Button>
            ) : null}
          </Fragment>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout, deleteUser })(Navbar)
