import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter, useLocation } from 'react-router-dom'

import { checkOtp } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert'

// destructured props ↘
const PasswordRecover = ({ checkOtp, history }) => {
    const location = useLocation()

    useEffect(() => {
        console.log(location.state.id);
    }, [])

    const [formData, setFormData] = useState({
        otp: '',
        isTrue: false,
        password: '',
        confirmPassword: ''
    });

    const { otp, password, confirmPassword, isTrue } = formData;

    const onChange = e => setFormData({ [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        // history.push('/login')
        const res = await checkOtp(otp, history)
        setFormData({ isTrue: res })
        if (password !== confirmPassword) {
            // this wil call setAlert action
            setAlert('Passwords do not match', 'danger', 2000)
        } else {
            console.log('Password changed');
            // console.log(formData);
        }
    }

    const unVerified = (
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

    const verified = (
        <Fragment>
            <h1 className="large text-primary">Enter new password</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => onChange(e)}
                        minLength='6'
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


    return (<Fragment>
        {!isTrue ? unVerified : null}
        {isTrue ? verified : null}
    </Fragment>)
}

PasswordRecover.propTypes = {
    checkOtp: PropTypes.func.isRequired,
};


export default connect(null, { checkOtp })(withRouter(PasswordRecover));

