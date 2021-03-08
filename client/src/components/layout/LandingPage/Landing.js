import React from 'react'
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
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
