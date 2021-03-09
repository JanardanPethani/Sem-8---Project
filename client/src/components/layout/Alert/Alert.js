import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = props => props.alerts !== null
    && props.alerts.length > 0
    && props.alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

// get state from reducers
// alerts is exported from reducers/index.js
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps, null)(Alert)
