import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

const Requests = ({ request }) => {

    const requests = request.map((req) => (
        <tr key={req._id}>
            <td>{req.from}</td>
            <td>{req.to}</td>
            <td><Moment>{req.departAt}</Moment></td>
            <td>
                <button className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Requests</h2>
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
                    {requests.length !== 0 ? requests : <tr>No requests found</tr>}
                </tbody>
            </table>
        </Fragment>
    )
}

Requests.propTypes = {
    request: PropTypes.array.isRequired,
}

export default connect()(Requests)
