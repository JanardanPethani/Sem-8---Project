import React, { Fragment } from 'react'

const getStatus = (time) => {
  const curDate = new Date()
  const info = new Date(time)
  if (curDate.getDate() > info.getDate()) {
    return <p className='inline-block font-medium text-red-500'>Expired</p>
  } else if (curDate.getTime() > info.getTime()) {
    return <p className='inline-block font-medium text-red-500'>Expired</p>
  } else {
    return <p className='inline-block font-medium text-green-500'>Available</p>
  }
}

const MatchCard = ({ array }) => {
  return (
    <Fragment>
      {array.map((ride) => (
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
                <div className='self-center text-left ml-2'>
                  {getStatus(ride.departAt)}
                </div>
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
            <div className='max-w-full pb-2 pt-2 bg-gray-100 font-bold text-xl'>
              {ride.price}
            </div>
          </article>
        </div>
      ))}
    </Fragment>
  )
}

export default MatchCard
