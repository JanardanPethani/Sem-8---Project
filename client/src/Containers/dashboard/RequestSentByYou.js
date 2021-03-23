import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const getTimeInfo = (time) => {
  const info = new Date(time).toString().split(' ')
  return info
    .filter((value, idx) => idx < 5)
    .map((i, index) => {
      if (i.includes(':')) {
        return (
          <p
            className='inline-block font-medium pr-1 text-green-400'
            key={index}
          >
            {i}
          </p>
        )
      }
      return (
        <p className='inline-block font-medium pr-1' key={index}>
          {i}
        </p>
      )
    })
}

const SentReqs = ({ sentRequest, history }) => {
  console.log(sentRequest)
  const requests = sentRequest.map((msg, index) => (
    <tr key={msg._id} className='hover:bg-gray-100'>
      <td>{index + 1}</td>
      <td>{msg.forWhich.from.slice(0, 10) + ' ...'}</td>
      <td>{msg.to.firstname}</td>
      <td>{getTimeInfo(msg.created_at)}</td>
      <td>
        <button
          className='btn btn-primary'
          onClick={() =>
            history.push({
              pathname: '/requestpage',
              state: { reqId: msg._id },
            })
          }
        >
          <i className='fas fa-info-circle'></i>
        </button>
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => {}}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className='p-6 text-xl font-medium'>Requests Sent By You</h2>
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
              <td colSpan={6}>No requests sent</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  )
}

export default withRouter(SentReqs)
