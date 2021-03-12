import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import { editProfile } from '../../store/actions/profile'
import { loadUser } from '../../store/actions/auth'

const EditProfile = ({ editProfile, auth: { user, loading }, history }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        age: ''
    })

    useEffect(() => {
        if (!user) loadUser();
        setFormData({
            firstname: loading || !user.firstname ? '' : user.firstname,
            lastname: loading || !user.lastname ? '' : user.lastname,
            email: loading || !user.email ? '' : user.email,
            phone: loading || !user.phone ? '' : user.phone,
            age: loading || !user.age ? '' : user.age
        })
    }, [loading, user]);

    const {
        firstname,
        lastname,
        phone,
        email,
        age
    } = formData

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        editProfile(formData, history)
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Edit</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Change details
      </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='First Name'
                        name='firstname'
                        value={firstname}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lastname'
                        value={lastname}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='tel'
                        placeholder='Phone number'
                        name='phone'
                        value={phone}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='number'
                        placeholder='age'
                        name='age'
                        value={age}
                        onChange={(e) => onChange(e)}
                        min='13'
                        max='80'
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Update' />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired
    // auth: PropTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { editProfile, loadUser })(withRouter(EditProfile))
