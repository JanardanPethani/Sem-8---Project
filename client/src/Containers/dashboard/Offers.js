import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { deleteOff } from '../../store/actions/offer'
import getTimeInfo from '../../utils/getTimeInfo'

const Offers = ({ offer, deleteOff, history }) => {
  const offers = offer.map((off, index) => (
    <tr key={off._id} className='hover:bg-gray-100'>
      <td>{index + 1}</td>
      <td>{off.from.slice(0, 10) + ' ...'}</td>
      <td>{off.to.slice(0, 10) + ' ...'}</td>
      <td>{getTimeInfo(off.departAt)}</td>
      <td>
        <button
          className='btn btn-primary'
          onClick={() =>
            history.push({
              pathname: '/offerpage',
              state: { offId: off._id },
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
            deleteOff(off._id)
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className='p-6 text-xl font-medium'>All Offers By You</h2>
      <table className='table shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-primaryColor text-white'>
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
          {offers.length !== 0 ? (
            offers
          ) : (
            <tr>
              <td colSpan={6}>No offer found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  )
}

Offers.propTypes = {
  offer: PropTypes.array.isRequired,
}

export default connect(null, { deleteOff })(withRouter(Offers))
