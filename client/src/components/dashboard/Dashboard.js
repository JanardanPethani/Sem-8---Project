import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner/Spinner'
import DashboardActions from './DashboardActions'
import Requests from './Requests'
import Offers from './Offers'

import { getCurrentProfile } from '../../store/actions/profile'

const Dashboard = ({ getCurrentProfile,
    auth,
    profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [])

    return loading && profile && auth.loading === null ? <Spinner /> : <Fragment>

        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            {/*logic : if user exist then show name */}
            <i className="fas fa-user" /> Welcome {auth.user && (auth.user.firstname + ' ' + auth.user.lastname)}
        </p>
        {profile !== null && (profile.req.length !== 0 || profile.off.length !== 0) ? (
            <Fragment>
                <DashboardActions />
                <Requests request={profile.req} />
                <Offers offer={profile.off} />
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not requested / offered a ride</p>
                <br />
                <DashboardActions />
            </Fragment>
        )}
    </Fragment >
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