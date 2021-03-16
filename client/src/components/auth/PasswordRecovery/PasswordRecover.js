import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter, useLocation } from 'react-router-dom'

import { checkOtp } from '../../../store/actions/auth';

// destructured props ↘
const PasswordRecover = ({ checkOtp, history }) => {
    const location = useLocation()

    useEffect(() => {
        console.log(location.state.id);
    }, [])

    const [formData, setFormData] = useState({
        otp: '',
        isTrue: false
    });

    const { otp } = formData;

    const onChange = e => setFormData({ [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // history.push('/login')
        formData.isTrue = checkOtp(+formData.otp)
        console.log(formData.isTrue);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Enter Otp</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Enter Otp"
                        name="otp"
                        value={otp}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Confirm" />
                <Link className="btn btn-light my-1" to="/login">
                    Go Back
            </Link>
            </form>

        </Fragment>
    )
}

PasswordRecover.propTypes = {
    checkOtp: PropTypes.func.isRequired,
};


export default connect(null, { checkOtp })(withRouter(PasswordRecover));

