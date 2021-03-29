import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = (props) => {
  return (
    <div className='justify-center flex flex-col lg:flex-row mt-6'>
      <Link
        to='/request'
        className='m-2 py-2 px-4 font-semibold bg-white rounded-xl shadow-md overflow-hidden hover:bg-gray-200'
      >
        <i className='fas fa-route text-primary'></i> Post a Request
      </Link>
      <Link
        to='/offer'
        className='m-2 py-2 px-4 font-semibold bg-white rounded-xl shadow-md overflow-hidden hover:bg-gray-200'
      >
        <i className='fas fa-rupee-sign text-primary'></i> Offer a ride
      </Link>
    </div>
  )
}

export default DashboardActions
