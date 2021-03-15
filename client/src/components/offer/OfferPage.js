import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'

import { getOffer } from '../../store/actions/offer'
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

const OfferPage = ({ getOffer, offerData, getCurrentProfile, profile: { loading } }) => {
    const location = useLocation()
    useEffect(() => {
        getOffer(location.state.offId)
        getCurrentProfile()
    }, [])

    const { from, to, created_at, departAt } = offerData
    const data = (
        <Fragment>
            <div className="p-6 text-center text-2xl font-semibold ">
                Offer Information
            </div>
            <div className="p-6 m-4 max-w-xl mx-auto bg-white rounded-xl shadow-md">
                <div className="flex p-3 m-1 ">
                    <div className="w-1/4 flex-shrink-0 pr-2 textsm font-medium self-center">
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
                    <div className='self-center text-left ml-2'>{getStatus(departAt)}</div>
                </div>

            </div>

        </Fragment>
    )

    return (
        loading ? <Spinner /> : data
    )
}

OfferPage.propTypes = {
    getOffer: PropTypes.func.isRequired,
    offerData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    offerData: state.profile.currOfferData,
    profile: state.profile
})

export default connect(mapStateToProps, { getOffer, getCurrentProfile })(OfferPage)
