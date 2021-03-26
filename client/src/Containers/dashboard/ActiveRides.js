import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { paymentReceived } from '../../store/actions/offer'

import getStatus from '../../utils/getActiveRideStatus'
import getTimeInfo from '../../utils/getTimeInfo'

const ActiveRide = ({ activeRide, auth, paymentReceived, history }) => {
  const ride = activeRide[0]

  return (
    <Fragment>
      {activeRide.length !== 0 ? (
        <div className='max-w-lg mx-auto bg-white border-1  mt-4 mb-3 rounded-md tracking-wide shadow-md overflow-hidden'>
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
          <div className='flex flex-col justify-items-center mt-3'>
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
                  {getTimeInfo(ride.forWhich.departAt)}
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
          {/* Payment received button */}
          {auth.user.email === ride.to.email ? (
            <div>
              <span className='flex flex-row justify-center text-gray-500 text-center pl-2 pr-2 rounded-md text-xs'>
                Click after ride & payment completion.
              </span>
              <div
                className='flex flex-row justify-center  p-3 bg-green-50 hover:bg-green-400 hover:text-white cursor-pointer border-t-2'
                onClick={() => paymentReceived(ride._id)}
              >
                Payment Received
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </Fragment>
  )
}

ActiveRide.propTypes = {
  auth: PropTypes.object.isRequired,
  paymentReceived: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { paymentReceived })(
  withRouter(ActiveRide)
)
