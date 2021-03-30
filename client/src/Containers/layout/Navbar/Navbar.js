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

// import './Navbar.css'

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bgColor: {
    backgroundColor: 'white',
  },
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

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
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
            <i className='fas fa-user-circle text-primary'></i> Edit Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/history'>
            <i className='fas fa-history'></i> History
          </Link>
        </MenuItem>
        <MenuItem onClick={() => logout('all')}>
          <i className='fas fa-sign-out-alt' /> Logout All
        </MenuItem>
      </Menu>
    </Fragment>
  )

  const guestLinks = ''

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.bgColor}>
        <Toolbar>
          {!loading ? (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          ) : null}
          <Typography className={classes.title}>
            <Link to='/'>Get Your Ride</Link>
          </Typography>
          <Button onClick={() => logout()}>
            <i className='fas fa-sign-out-alt' /> Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
