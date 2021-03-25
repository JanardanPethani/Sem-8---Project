import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getStatus from '../../utils/getActiveRideStatus'

const ActiveRide = ({ activeRide, history }) => {
  const ride = activeRide[0]
  // .map((msg, index) => (
  //   <tr key={msg._id} className='hover:bg-gray-100'>
  //     <td>{msg.forWhich.from.slice(0, 10) + ' ...'}</td>
  //     <td>{msg.forWhich.to.slice(0, 10) + ' ...'}</td>
  //     <td>{`${msg.to.firstname} ${msg.to.lastname}`}</td>
  //     <td>{`${msg.reqBy.firstname} ${msg.reqBy.lastname}`}</td>
  //     <td>
  //       <button
  //         className='btn btn-success'
  //         onClick={() =>
  //           history.push({
  //             pathname: '/currActiveRide',
  //             state: { id: msg._id },
  //           })
  //         }
  //       >
  //         <i className='fas fa-info-circle'></i>
  //       </button>
  //     </td>
  //   </tr>
  // ))

  return (
    <Fragment>
      {activeRide.length !== 0 ? (
        // <div>
        //   <h2 className='p-6 text-xl font-medium'>Active Ride</h2>
        //   <table className='table shadow-lg rounded-lg overflow-hidden'>
        //     <thead className='bg-primaryColor text-white '>
        //       <tr>
        //         <th>From</th>
        //         <th>Destination</th>
        //         <th>Driver</th>
        //         <th>Passenger</th>
        //         <th>Info</th>
        //       </tr>
        //     </thead>
        //     <tbody>{ride}</tbody>
        //   </table>
        // </div>

        <div className='max-w-lg mx-auto bg-white border-2 border-gray-300 mt-4 rounded-md tracking-wide shadow-lg'>
          <h2 className='p-2 bg-gray-100 text-xl text-center font-medium'>
            Active Ride
          </h2>
          {/* name */}
          <div className='flex flex-row justify-center m-3'>
            <div className=' m-2'>
              <h5 className='font-semibold text-primaryColor '>Driver</h5>
              <h4 className='text-xl font-semibold'>
                {`${ride.to.firstname} ${ride.to.lastname}`}
              </h4>
            </div>
            <div className='border-r-2 m-2'></div>
            <div className=' m-2'>
              <h5 className='font-semibold text-primaryColor '>Passenger</h5>
              <h4 className='text-xl font-semibold'>
                {`${ride.reqBy.firstname} ${ride.reqBy.lastname}`}
              </h4>
            </div>
          </div>
          {/* Data */}
          <div className='flex flex-col justify-items-center m-3'>
            <div className='divide-y divide-gray p-4'>
              <div className='flex p-4 text-left'>
                <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                  From :
                </div>
                <div className='self-center text-left  ml-2'>
                  {ride.forWhich.from}
                </div>
              </div>
              <div className='flex p-4 text-left'>
                <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                  To :
                </div>
                <div className='self-center text-left  ml-2'>
                  {ride.forWhich.to}
                </div>
              </div>
              <div className='flex p-4 text-left'>
                <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                  Depart Time :
                </div>
                <div className='self-center text-left  ml-2'>
                  {ride.forWhich.departAt}
                </div>
              </div>
              <div className='flex p-4 text-left'>
                <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                  Status :
                </div>
                <div className='self-center text-left  ml-2'>
                  {getStatus(ride.forWhich.departAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  )
}

ActiveRide.propTypes = {}

export default connect(null, null)(withRouter(ActiveRide))
