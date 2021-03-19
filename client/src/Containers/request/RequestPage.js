import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'

import { getRequest, matchRides } from '../../store/actions/request'

import Spinner from '../layout/Spinner/Spinner'
import MatchCard from '../../Components/MatchCard/MatchCard'
import RequestInfo from '../../Components/RequestInfoPage/RequestInfoPage'

const RequestPage = ({
    getRequest,
    requestData,
    loading,
    matchesArray,
    matchRides,
}) => {
    const location = useLocation()

    const [getMatch, setMatch] = useState(false)

    useEffect(() => {
        getRequest(location.state.reqId)
    }, [])

    const { from, to, created_at, departAt } = requestData
    const status = getStatus(departAt)

    const data = (
        <Fragment>
            <div className=' pb-6 text-center text-2xl font-semibold '>
                Request Information
      </div>
            <RequestInfo array={from, to, created_at, departAt, status} />
            {status.props.children !== 'Expired' ? (
                <div className='flex p-3 m-1 justify-center'>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            setMatch(true)
                            if (!getMatch) {
                                matchRides(from)
                            }
                        }}
                    >
                        Get Matching Offers
          </button>
                </div>
            ) : null}

            {getMatch ? (
                <div className='text-center container my-5 mx-auto px-4 md:px-12'>
                    <button
                        onClick={() => {
                            setMatch(false)
                        }}
                    ><i className="fas fa-times-circle text-3xl"></i>
                    </button>
                    <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                        <MatchCard array={matchesArray} />
                    </div>
                </div>
            ) : null}
        </Fragment>
    )

    return loading && requestData ? <Spinner /> : data
}

RequestPage.propTypes = {
    getRequest: PropTypes.func.isRequired,
    matchRides: PropTypes.func.isRequired,
    requestData: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    matchesArray: PropTypes.array,
}

const mapStateToProps = (state) => ({
    requestData: state.profile.currRequestData,
    loading: state.profile.loading,
    matchesArray: state.profile.currRequestMatches,
})

export default connect(mapStateToProps, {
    getRequest,
    matchRides,
})(RequestPage)