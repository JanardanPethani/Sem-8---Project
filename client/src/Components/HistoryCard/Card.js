import React, { Fragment } from 'react'

const MatchCard = ({ data }) => {
  return (
    <Fragment>
      <div className='relative border-2 border-gray-200 shadow-md p-2 mt-5'>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>Passenger : </h3>
          <p>{data.reqBy}</p>
        </div>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>Driver : </h3>
          <p>{data.driver}</p>
        </div>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>From : </h3>
          <p className=' lg:w-4/5 w-44'>{data.from}</p>
        </div>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>To : </h3>
          <p>{data.to}</p>
        </div>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>Price : </h3>
          <p>{data.price}</p>
        </div>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>Vehicle Type : </h3>
          <p>{data.vehicleType}</p>
        </div>
        <div className='flex'>
          <h3 className=' lg:w-44 w-28 font-medium'>Time : </h3>
          <p className=' lg:w-4/5 w-44'>{data.departedAt}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default MatchCard
