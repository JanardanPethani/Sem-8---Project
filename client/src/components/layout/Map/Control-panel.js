import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Control-panel.css'

import { getPlace } from '../../../store/actions/map'

const toFix = (value) => {
    if (value) {
        return value.toFixed(4)
    }
    return value
}

const ControlPanel = ({ events, getPlace, place }) => {
    const [locData, setData] = useState({
        latitude: '',
        longitude: ''
    })

    const { latitude, longitude } = locData

    useEffect(() => {
        setData({
            ...locData,
            latitude: toFix(events.onDragEnd[1]),
            longitude: toFix(events.onDragEnd[0])
        })
        getPlace(latitude, longitude)
    }, [events])

    return (
        <div className="control-panel">
            <strong>Address:</strong> {place.place ? `${place.place}` : <em>null</em>}
        </div>
    );
}

ControlPanel.prototype = {
    getPlace: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    place: state.map.place
})

export default connect(mapStateToProps, { getPlace })(React.memo(ControlPanel));