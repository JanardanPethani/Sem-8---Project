import React from 'react'
import './Navbar.css'

 const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html"><i className="fas fa-route"></i> Get Your Ride</a>
            </h1>
            <ul>
                <li><a href="register.html">Register</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar