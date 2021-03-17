import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'

import { deleteReq } from '../../store/actions/request'
import PrivateRoute from '../routing/PrivateRoute'

const getTimeInfo = (time) => {
    const info = new Date(time).toString().split(' ')
    return info.filter((value, idx) => idx < 5).map((i, index) => {
        if (i.includes(':')) {
            return (
                <p className="inline-block font-medium pr-1 text-green-400" key={index} >{i}</p>
            );
        }
        return (
            <p className="inline-block font-medium pr-1" key={index} >{i}</p>
        );
    });
}

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

const Requests = ({ request, deleteReq, history }) => {

    const requests = request.map((req, index) => (
        <tr key={req._id} onClick={() => history.push({
            pathname: '/request'
        })} className="hover:bg-gray-100">
            <td>{index + 1}</td>
            <td>{req.from}</td>
            <td>{req.to}</td>
            <td>{getTimeInfo(req.departAt)}</td>
            <td>{getStatus(req.departAt)}</td>
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
                    <tr onClick={() => console.log('Clicked')}>
                        <th>#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {requests.length !== 0 ? requests : <tr><td colSpan={6}>No requests found</td></tr>}
                </tbody>
            </table>
        </Fragment >
    )
}

Requests.propTypes = {
    request: PropTypes.array.isRequired,
}

export default connect(null, { deleteReq })(withRouter(Requests))
