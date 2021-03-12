import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

const Requests = ({ offer }) => {

    const offers = offer.map((off) => (
        <tr key={off._id}>
            <td>{off.from}</td>
            <td>{off.to}</td>
            <td><Moment>{off.departAt}</Moment></td>
            <td>
                <button className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Offers</h2>
            <table className="table">
                <thead>
                    <tr>
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
    request: PropTypes.array.isRequired,
}

export default connect()(Requests)
