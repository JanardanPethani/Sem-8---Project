import axios from 'axios'

import setAuthToken from '../../utils/setAuthToken';
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    PROFILE_ERROR,
    CHECK_OTP,
    OTP_FAILED
} from './types'


// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }

};

// login
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email, password
    })
    // console.log(email, password);
    try {
        const res = await axios.post('/api/auth/login', body, config)
        // console.log(res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        // To set user data in store
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// Logout
export const logout = (all = null) => async dispatch => {
    if (all === 'all') {
        await axios.post('/api/auth/logoutAll')
    }
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
};

// Register a user
export const register = ({ firstname, lastname, email, age, phone, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        firstname, lastname, email, age, phone, password
    })

    try {
        const res = await axios.post('/api/user/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        dispatch(setAlert('Account successfuly created', 'success'))

    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// delete current user
export const deleteUser = () => async dispatch => {
    if (window.confirm('Sure? this can not be undone..!')) {
        try {
            await axios.delete(`/api/user/me`)
            dispatch({
                type: DELETE_ACCOUNT
            });
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch(setAlert('Account successfuly removed'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error }
            })
        }
    }
}

// check availability of user
export const checkUser = (email, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        email
    }

    try {
        const res = await axios.post('/api/auth/getUser', body, config)
        if (res) {
            // console.log(res);
            dispatch(setAlert(res.data.msg, 'success'))
            history.push({
                pathname: '/passwordRecovery',
                state: { id: email }
            })
        }
    }
    catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const checkOtp = (otp, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        otp
    }

    try {
        const res = await axios.post('/api/auth/checkOtp', body, config)
        if (res) {
            // console.log(res);
            dispatch(setAlert(res.data.msg, 'success'))

            return true
        }
    }
    catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        return false
    }
}

export const updatePassword = (email, pass, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        email,
        password: pass
    }

    try {
        const res = await axios.patch('/api/user/updatePassword', body, config)
        if (res.data.msg === 'Password updated') {
            console.log(res);
            dispatch(setAlert(res.data.msg, 'success'))
            history.push('/login')
        }
    }
    catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}