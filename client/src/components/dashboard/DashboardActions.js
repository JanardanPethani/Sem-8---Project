import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = props => {
    return (
        <div className="justify-center flex  mt-6">
            <Link to="/edit-profile" className="m-2 py-2 px-4 font-semibold bg-white rounded-xl shadow-md overflow-hidden hover:bg-gray-200"><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/request" className="m-2 py-2 px-4 font-semibold bg-white rounded-xl shadow-md overflow-hidden hover:bg-gray-200"><i className="fas fa-route text-primary"></i> Add Request</Link>
            <Link to="/offer" className="m-2 py-2 px-4 font-semibold bg-white rounded-xl shadow-md overflow-hidden hover:bg-gray-200"><i className="fas fa-rupee-sign text-primary"></i> Add Offer</Link>
        </div>
    )
}

export default DashboardActions
