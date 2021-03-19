import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'

import { checkUser } from '../../../store/actions/auth';

// destructured props ↘
const ForgotPassword = ({ checkUser, history }) => {

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        checkUser(email, history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Enter email</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Send OTP" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
            </Link>
            </form>

        </Fragment>
    )
}

ForgotPassword.propTypes = {
    checkUser: PropTypes.func.isRequired,
};


export default connect(null, { checkUser })(withRouter(ForgotPassword));

