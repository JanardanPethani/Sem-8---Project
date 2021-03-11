import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {

} from '../../store/actions/types'

const OfferForm = props => {
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
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Offer a ride</h1>
            <p className="lead">
                Add details
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Pickup Location"
                        name="from"
                        value={from}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Starting point
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Destination Location"
                        name="to"
                        value={to}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Destination point
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        name="departAt"
                        value={departAt}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Date
                            </small>
                </div>
                <div className="form-group">
                    <input
                        type="time"
                        name="departAt"
                        value={departAt}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Time
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

OfferForm.propTypes = {

}

export default OfferForm
