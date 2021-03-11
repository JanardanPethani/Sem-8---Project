import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendRequest } from '../../store/actions/request'


//TODO: Select type -> seats 

const RequestForm = ({ sendRequest }) => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departAt: ''
    });

    const {
        from,
        to,
        departAt
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // console.log('OnSubmit exec');
        // console.log(formData);
        sendRequest(formData)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Request a ride</h1>
            <p className="lead">
                Add details
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Pickup Location"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Pickup point
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Destination Location"
                        name="to"
                        value={to}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Destination point
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="datetime-local"
                        name="departAt"
                        value={departAt}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Date/Time
                            </small>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    )
}

RequestForm.propTypes = {
    sendRequest: PropTypes.func.isRequired,
}

export default connect(null, { sendRequest })(RequestForm)