import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter, useLocation } from 'react-router-dom'

import { checkOtp, updatePassword } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert'

// destructured props ↘
const PasswordRecover = ({ checkOtp, updatePassword, history, setAlert }) => {
    const location = useLocation()

    useEffect(() => {
        console.log(location.state.id);
    }, [])

    const [formData, setFormData] = useState({
        otp: '',
        isTrue: false
    });
    const [passData, setPassData] = useState({
        password: '',
        confirmPassword: ''
    });

    const { otp, isTrue } = formData;
    const { password, confirmPassword } = passData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onConfirm = e => {
        // console.log(e);

        setPassData({
            ...passData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitOtp = async e => {
        e.preventDefault();
        // history.push('/login')
        const res = await checkOtp(otp, history)
        console.log(res);
        setFormData({ isTrue: res })
    }

    const onSubmitPass = e => {
        e.preventDefault();
        console.log('Called on password submit and values: ', `${password}`, `${confirmPassword}`);
        if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger', 2000)
        } else {
            console.log('Password changed');
            updatePassword(location.state.id, password, history)
        }
    }

    return (<Fragment>
        {!isTrue ? <div>
            <h1 className="large text-primary">Enter Otp</h1>
            <form className="form" onSubmit={e => onSubmitOtp(e)}>
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
                <input type="submit" className="btn btn-primary" value="Check Otp" />
                <Link className="btn btn-light my-1" to="/login">
                    Go Back
            </Link>
            </form>
        </div> : null}
        {isTrue ? <div>
            <h1 className="large text-primary">Enter new password</h1>
            <form className="form" onSubmit={e => onSubmitPass(e)}>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onConfirm(e)}
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
                        onChange={(e) => onConfirm(e)}
                        minLength='6'
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Confirm" />
                <Link className="btn btn-light my-1" to="/login">
                    Go Back
            </Link>
            </form>
        </div> : null}
    </Fragment>)
}

PasswordRecover.propTypes = {
    checkOtp: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired

};


export default connect(null, { checkOtp, setAlert, updatePassword })(withRouter(PasswordRecover));

