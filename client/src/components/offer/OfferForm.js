import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendOffer } from '../../store/actions/offer'


//TODO: Select type -> seats 

const OfferForm = ({ sendOffer, history }) => {
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
        sendOffer(formData, history)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Offer a ride</h1>
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
                        Starting point
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

OfferForm.propTypes = {
    sendOffer: PropTypes.func.isRequired
}

export default connect(null, { sendOffer })(withRouter(OfferForm))
