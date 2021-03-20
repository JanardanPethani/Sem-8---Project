import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'

import { getOffer } from '../../store/actions/offer'
import Spinner from '../../Components/Spinner/Spinner'
import OfferInfo from '../../Components/InfoPage/InfoPage'

const OfferPage = ({ getOffer, offerData, profile: { loading } }) => {
    const location = useLocation()
    useEffect(() => {
        getOffer(location.state.offId)
    }, [])

    const data = (
        <Fragment>
            <OfferInfo data={{ ...offerData }} />
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

export default connect(mapStateToProps, { getOffer })(OfferPage)
