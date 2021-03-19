import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'

import { getRequest, matchRides } from '../../store/actions/request'
import { getCurrentProfile } from '../../store/actions/profile'
import Spinner from '../layout/Spinner/Spinner'

const getStatus = (time) => {
    const curDate = new Date()
    const info = new Date(time)
    if (curDate.getDate() > info.getDate()) {
        return <p className="inline-block font-medium text-red-500">Expired</p>
    } else if (curDate.getTime() > info.getTime()) {
        return <p className="inline-block font-medium text-red-500">Expired</p>
    } else {
        return <p className="inline-block font-medium text-green-500">Available</p>
    }
}

const RequestPage = ({ getRequest, requestData, getCurrentProfile, loading, matches, matchRides }) => {
    const location = useLocation()

    const [getMatch, setMatch] = useState(false)

    useEffect(() => {
        getRequest(location.state.reqId)
        getCurrentProfile()
    }, [])

    const { from, to, created_at, departAt } = requestData
    const status = (getStatus(departAt))
    const data = (
        <Fragment>
            <div className=" pb-6 text-center text-2xl font-semibold ">
                Request Information
            </div>
            <div className="p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md">
                <div className="flex p-3 m-1 ">
                    <div className="w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center">
                        From :
                    </div>
                    <div className='self-center text-left  ml-2'>{from}</div>
                </div>
                <hr />
                <div className="flex p-3 m-1 ">
                    <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                        To :
                    </div>
                    <div className='self-center text-left ml-2'>{to}</div>
                </div>
            </div>
            <div className="p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md ">
                <div className="flex p-3 m-1 ">
                    <div className="w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center">
                        Leaving At :
                    </div>
                    <div className='self-center text-left ml-2'>{departAt}</div>
                </div>
                <hr />
                <div className="flex p-3 m-1 ">
                    <div className='w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center'>
                        Posted At :
                    </div>
                    <div className='self-center text-left ml-2'>{created_at}</div>
                </div>
            </div>
            <div className="p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md ">
                <div className="flex p-3 m-1 ">
                    <div className="w-1/4 flex-shrink-0 pr-2 text-sm font-medium self-center">
                        Status :
                    </div>
                    <div className='self-center text-left ml-2'>{status}</div>
                </div>

            </div>
            {status.props.children !== 'Expired' ?
                <div className="flex p-3 m-1 justify-center">
                    <button className="btn btn-primary" onClick={() => {
                        setMatch(true)
                        matchRides(from)
                    }}>Get Matching Offers</button>
                </div>
                : null}

            {getMatch ?
                <div className="flex p-3 m-1 justify-center">
                    Offers
                </div>
                : null}
        </Fragment>
    )

    return (
        loading && requestData ? <Spinner /> : data
    )
}

RequestPage.propTypes = {
    getRequest: PropTypes.func.isRequired,
    matchRides: PropTypes.func.isRequired,
    requestData: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    matches: PropTypes.array,
}

const mapStateToProps = state => ({
    requestData: state.profile.currRequestData,
    loading: state.profile.loading,
    matches: state.profile.currRequestMatches
})

export default connect(mapStateToProps, { getRequest, getCurrentProfile, matchRides })(RequestPage)
