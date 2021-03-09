import React from 'react'
import { Link } from 'react-router-dom'

import './Landing.css'
import '../../../App.css'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Share happiness.</h1>
                    <p className="lead">
                        Find or Share your journy with people.</p>
                    <div className="dash-buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
