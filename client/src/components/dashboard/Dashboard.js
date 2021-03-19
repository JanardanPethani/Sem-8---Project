import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner/Spinner'
import DashboardActions from './DashboardActions'
import Requests from './Requests'
import Offers from './Offers'

import { getCurrentProfile } from '../../store/actions/profile'
import { deleteUser } from '../../store/actions/auth'

const Dashboard = ({ getCurrentProfile,
    auth,
    profile: { profile, loading },
    deleteUser }) => {

    useEffect(() => { getCurrentProfile() }, [getCurrentProfile])

    return loading && profile && auth.loading === null ? <Spinner /> :
        <Fragment>
            <div className="max-w-md mx-auto bg-white shadow-lg p-2 rounded-lg overflow-hidden  text-center">
                <div className="p-5">
                    <div className="uppercase tracking-wide font-bold">Welcome </div>
                    <p className="mt-2 text-800 font-bold leading-relaxed">{auth.user && (auth.user.firstname + ' ' + auth.user.lastname)}</p>
                </div>
            </div>

            {
                profile !== null && (profile.req.length !== 0 || profile.off.length !== 0) ? (
                    <Fragment>
                        <DashboardActions />
                        <Requests request={profile.req} />
                        <Offers offer={profile.off} />
                    </Fragment>
                ) : (
                    <Fragment>
                        <DashboardActions />
                        <br />
                        <p className="max-w-md mx-auto mt-2 text-center text-500 leading-relaxed">You have not requested / offered a ride</p>
                    </Fragment>
                )
            }
            <div className="justify-center flex mt-8 pb-8">
                <button className="btn btn-danger p-2 rounded" onClick={() => deleteUser()}>
                    <i className="fas fa-user-minus"></i>{' '}
                Delete Account
            </button>
            </div>
        </Fragment >
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteUser })(Dashboard)