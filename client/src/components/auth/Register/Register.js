import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Register.css'

// Actions
import { setAlert } from '../../../store/actions/alert'
import { register } from '../../../store/actions/auth'

// props is destructured into ({setAlert, ... })
const Register = ({ setAlert, register, isAuthenticated }) => {
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

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // this wil call setAlert action
            setAlert('Passwords do not match', 'danger', 2000);
        } else {
            register({ firstname, lastname, phone, email, password })
            // console.log(formData);
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register)