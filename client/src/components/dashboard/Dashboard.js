import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner/Spinner'

import { getCurrentProfile } from '../../store/actions/profile'

const Dashboard = ({ getCurrentProfile,
    auth: { user },
    profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [])

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            {/*logic : if user exist then show name */}
            <i className="fas fa-user" /> Welcome {user && (user.firstname + ' ' + user.lastname)}
        </p>
        {profile !== null && profile.req.length !== 0 && profile.off.length !== 0 ? (
            <Fragment>
                <Link to='/request' className="btn btn-primary my-1">
                    Request Ride
                </Link>
                <Link to='/offer' className="btn btn-primary my-1">
                    Offer Ride
                </Link>
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not requested / offered a ride</p>
                <Link to='/request' className="btn btn-primary my-1">
                    Request Ride
                </Link>
                <Link to='/offer' className="btn btn-primary my-1">
                    Offer Ride
                </Link>
            </Fragment>
        )}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)