import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ActiveRide = ({ activeRide, history }) => {
  const ride = activeRide.map((msg, index) => (
    <tr key={msg._id} className='hover:bg-gray-100'>
      <td>{msg.forWhich.from.slice(0, 10) + ' ...'}</td>
      <td>{msg.forWhich.to.slice(0, 10) + ' ...'}</td>
      <td>{`${msg.to.firstname} ${msg.to.lastname}`}</td>
      <td>{`${msg.reqBy.firstname} ${msg.reqBy.lastname}`}</td>
      <td>
        <button
          className='btn btn-success'
          onClick={() =>
            history.push({
              pathname: '/currActiveRide',
              state: { id: msg._id },
            })
          }
        >
          <i className='fas fa-info-circle'></i>
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className='p-6 text-xl font-medium'>Active Ride</h2>
      <table className='table shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-primaryColor text-white '>
          <tr>
            <th>From</th>
            <th>Destination</th>
            <th>Driver</th>
            <th>Passenger</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>{ride}</tbody>
      </table>
    </Fragment>
  )
}

ActiveRide.propTypes = {}

export default connect(null, null)(withRouter(ActiveRide))
