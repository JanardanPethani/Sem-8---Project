import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Navbar.css'

import { logout } from '../../../store/actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>)

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-route"></i> Get Your Ride</Link>
            </h1>
            {/* !loading && (<Frag...) --> will give same result*/}
            {!loading ? <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment> : null}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)