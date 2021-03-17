import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'

import { deleteOff } from '../../store/actions/offer'
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
    } else {
        return <p className="inline-block font-medium text-green-500">Available</p>
    }
}


const Offers = ({ offer, deleteOff, history }) => {

    const offers = offer.map((off, index) => (
        <tr key={off._id} onClick={() => history.push({
            pathname: '/offer'
        })} className="hover:bg-gray-100">
            <td>{index + 1}</td>
            <td>{off.from}</td>
            <td>{off.to}</td>
            <td>{getTimeInfo(off.departAt)}</td>
            <td>{getStatus(off.departAt)}</td>
            <td>
                <button className='btn btn-danger' onClick={() => {
                    deleteOff(off._id)
                }}><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="p-6 text-xl font-medium">All Offers</h2>
            <table className="table shadow-lg p-3 rounded-lg overflow-hidden">
                <thead className="bg-primaryColor text-white">
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
                    {offers.length !== 0 ? offers : <tr><td colSpan={6}>No offer found</td></tr>}
                </tbody>
            </table>
        </Fragment >
    )
}

Offers.propTypes = {
    offer: PropTypes.array.isRequired,
}

export default connect(null, { deleteOff })(withRouter(Offers))
