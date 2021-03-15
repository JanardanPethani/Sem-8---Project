import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { deleteReq } from '../../store/actions/request'

const Requests = ({ request, deleteReq }) => {

    const requests = request.map((req, index) => (
        <tr key={req._id}>
            <td>{index + 1}</td>
            <td>{req.from}</td>
            <td>{req.to}</td>
            <td><Moment>{req.departAt}</Moment></td>
            <td>
                <button className='btn btn-danger' onClick={() => {
                    deleteReq(req._id)
                }}><i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="p-6 text-xl font-medium">All Requests</h2>
            <table className="table shadow-lg p-3 rounded-lg overflow-hidden">
                <thead className="bg-primaryColor text-white ">
                    <tr>
                        <th>#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Time</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {requests.length !== 0 ? requests : <tr><td colSpan={5}>No requests found</td></tr>}
                </tbody>
            </table>
        </Fragment >
    )
}

Requests.propTypes = {
    request: PropTypes.array.isRequired,
}

export default connect(null, { deleteReq })(Requests)
