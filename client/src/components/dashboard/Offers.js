import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { deleteOff } from '../../store/actions/offer'

const Requests = ({ offer, deleteOff }) => {

    const offers = offer.map((off, index) => (
        <tr key={off._id}>
            <td>{index + 1}</td>
            <td>{off.from}</td>
            <td>{off.to}</td>
            <td><Moment>{off.departAt}</Moment></td>
            <td>
                <button className='btn btn-danger' onClick={() => {
                    deleteOff(off._id)
                }}><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="p-6 text-xl font-medium">Offers</h2>
            <table className="table">
                <thead className="bg-primaryColor text-white">
                    <tr>
                        <th>#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Time</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {offers.length !== 0 ? offers : <tr>No Offers found</tr>}
                </tbody>
            </table>
        </Fragment>
    )
}

Requests.propTypes = {
    offer: PropTypes.array.isRequired,
}

export default connect(null, { deleteOff })(Requests)
