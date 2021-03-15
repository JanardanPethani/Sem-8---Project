import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendRequest } from '../../store/actions/request'

import Map from '../layout/Map/Map'

//TODO: Select type -> seats 

const RequestForm = ({ sendRequest, history }) => {
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

    const onChange = e => {
        if (e.target.name === 'departAt') {
            // Only in chrome
            const currDate = new Date().getDate()
            const currTime = new Date().getTime()

            const dateTime = new Date(e.target.value)
            const date = dateTime.getDate()
            const time = dateTime.getTime()
            console.log('From Request Form: ' + date + ' ' + time)
            // 60000 ->9 * 60 * 1000 -> 9 min
            if ((date - currDate >= 0) && (time - currTime >= 540000)) {
                console.log('DateDiff is ok:' + (date - currDate));
                console.log('TimeDiff is ok:' + (time - currTime));
                setFormData({ ...formData, [e.target.name]: e.target.value });
            } else {
                setFormData({ ...formData, [e.target.name]: '' });
                alert('Please select proper date/time')
            }

        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const onSubmit = e => {

        e.preventDefault();
        sendRequest(formData, history)
    }

    return (
        <Fragment>

            <h1 className="large text-primary">Request a ride</h1>
            <div className="grid">
                <div className="relative h-96">
                    <Map />
                </div>

                <div className="relative mt-5 mb-5">
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
                                Date/Time <span className="bg-yellow-100 pl-2 pr-2 rounded-md">Set time after 10 min from {new Date().toString()}</span>
                            </small>
                        </div>

                        <input type="submit" className="btn btn-primary my-1" />
                        <Link className="btn btn-light my-1" to="/dashboard">
                            Go Back
                </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

RequestForm.propTypes = {
    sendRequest: PropTypes.func.isRequired
}

export default connect(null, { sendRequest })(withRouter(RequestForm))
