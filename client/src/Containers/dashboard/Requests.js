import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { deleteReq } from '../../store/actions/request'
import getTimeInfo from '../../utils/getTimeInfo'


const Requests = ({ request, deleteReq, history }) => {
  const requests = request.map((req, index) => (
    <tr key={req._id} className='hover:bg-gray-100'>
      <td>{index + 1}</td>
      <td>{req.from.slice(0, 10) + ' ...'}</td>
      <td>{req.to.slice(0, 10) + ' ...'}</td>
      <td>{getTimeInfo(req.departAt)}</td>
      <td>
        <button
          className='btn btn-primary'
          onClick={() =>
            history.push({
              pathname: '/requestpage',
              state: { reqId: req._id },
            })
          }
        >
          <i className='fas fa-info-circle'></i>
        </button>
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteReq(req._id)
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className='p-6 text-xl font-medium'>All Requests By You</h2>
      <table className='table shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-primaryColor text-white '>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
            <th>Info</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {requests.length !== 0 ? (
            requests
          ) : (
            <tr>
              <td colSpan={6}>No requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  )
}

Requests.propTypes = {
  request: PropTypes.array.isRequired,
}

export default connect(null, { deleteReq })(withRouter(Requests))
