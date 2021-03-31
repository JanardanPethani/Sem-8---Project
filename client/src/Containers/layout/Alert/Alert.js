import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function AlertM(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const Alert = (props) =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((alert) => (
    
      <Snackbar
        key={alert.id}
        open
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={3000}
      >
        <AlertM severity={alert.alertType}>{alert.msg}</AlertM>
      </Snackbar>
    
  ))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

// get state from reducers
// alerts is exported from reducers/index.js
const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps, null)(Alert)
