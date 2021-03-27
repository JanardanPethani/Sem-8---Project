import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'

import './Navbar.css'

import { logout } from '../../../store/actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={() => logout()} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
        <li>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <FormatListBulletedIcon style={{ color: 'white' }} />
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to='/edit-profile'>
                <i className='fas fa-user-circle text-primary'></i> Edit Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={() => logout('all')}>
              <i className='fas fa-sign-out-alt' /> Logout All
            </MenuItem>
          </Menu>
        </li>
      </ul>
    </Fragment>
  )

  const guestLinks = ''

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-route'></i> Get Your Ride
        </Link>
      </h1>
      {/* !loading && (<Frag...) --> will give same result*/}
      {!loading ? (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      ) : null}
    </nav>
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
