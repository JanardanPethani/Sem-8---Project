import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const { firstname, lastname, phone, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();
        if (e.password !== e.confirmPassword) {
            console.log('Passwords do not match');
        } else {
            console.log(formData);
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstname"
                        value={firstname}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <input type="text"
                        placeholder="Last Name"
                        name="lastname"
                        value={lastname}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <input type="tel"
                        placeholder="Phone number"
                        name="phone"
                        value={phone}
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment >
    )
}

export default Register