import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = props => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/request" className="btn btn-light"><i className="fas fa-route text-primary"></i> Add Request</Link>
            <Link to="/offer" className="btn btn-light"><i className="fas fa-rupee-sign text-primary"></i> Add Offer</Link>
        </div>
    )
}

export default DashboardActions
