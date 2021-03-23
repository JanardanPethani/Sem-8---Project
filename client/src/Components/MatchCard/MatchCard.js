import React, { Fragment } from 'react'

import getStatus from '../../utils/getStatus'

const MatchCard = ({ array, send }) => {
  return (
    <Fragment>
      {array.map((ride) => {
        const status = getStatus(ride.departAt)

        return (
          <div
            key={ride._id}
            className='px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 '
          >
            <article className='overflow-hidden rounded-lg shadow-lg'>
              <div className='max-w-full font-medium pb-2 pt-2 bg-gray-100 '>
                {ride.offBy.firstname}
              </div>
              <div className='divide-y divide-gray p-4'>
                <div className='flex p-4 text-left'>
                  <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                    From :
                  </div>
                  <div className='self-center text-left  ml-2'>{ride.from}</div>
                </div>
                <div className='flex p-4 m-1 text-left'>
                  <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                    To :
                  </div>
                  <div className='self-center text-left ml-2'>{ride.to}</div>
                </div>
                <div className='flex p-4 m-1 text-left'>
                  <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                    Phone :
                  </div>
                  <div className='self-center text-left ml-2'>
                    {ride.offBy.phone}
                  </div>
                </div>
                <div className='flex p-4 m-1 text-left'>
                  <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                    Leaving At :
                  </div>
                  <div className='self-center text-left ml-2'>
                    {ride.departAt}
                  </div>
                </div>
                <div className='flex p-4 m-1 text-left'>
                  <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                    Status :
                  </div>
                  <div className='self-center text-left ml-2'>{status}</div>
                </div>
                <div className='flex p-4 m-1 text-left'>
                  <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                    Seats Offered :
                  </div>
                  <div className='self-center text-left ml-2'>
                    {ride.vehicletype === 'car' ? (
                      <i class='fas fa-car'></i>
                    ) : (
                      <i class='fas fa-motorcycle'></i>
                    )}{' '}
                    - {ride.seats}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 max-w-full '>
                <div className='bg-gray-100 font-bold text-xl pb-2 pt-2'>
                  {ride.price}
                </div>
                <div>
                  {status.props.children !== 'Expired' ? (
                    <div
                      className='hover:bg-green-200 cursor-pointer bg-green-100 text-xl pb-2 pt-2'
                      onClick={() =>
                        send({
                          email: ride.offBy.email,
                          to: ride.offBy._id,
                          forWhich: ride._id,
                          from: ride.from,
                          destination: ride.to,
                          type: ride.vehicletype,
                        })
                      }
                    >
                      Send Request
                    </div>
                  ) : (
                    <div className='text-red-400 bg-green-100 text-xl pb-2 pt-2'>
                      Departed
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        )
      })}
    </Fragment>
  )
}

export default MatchCard
