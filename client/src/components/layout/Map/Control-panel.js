import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Control-panel.css'

import { getPlace } from '../../../store/actions/map'

const toFix = (value) => {
    if (value) {
        return value.toFixed(7)
    }
    return value
}

const ControlPanel = ({ events, getPlace, place, loadingLoc }) => {
    const [locData, setData] = useState({
        latitude: '',
        longitude: ''
    })

    const { latitude, longitude } = locData


    useEffect(() => {
        // console.log('Change loc', events);
        setData({
            ...locData,
            latitude: toFix(events.onDragEnd[1]),
            longitude: toFix(events.onDragEnd[0])
        })
        if (latitude) {
            getPlace(latitude, longitude)
        }
        // eslint-disable-next-line
    }, [events, latitude, longitude])

    return (
        <div className="control-panel">
            <strong>Address:</strong> {!loadingLoc ? `${place.place}` : <em>loading</em>}
        </div>
    );
}

ControlPanel.prototype = {
    getPlace: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired,
    loadingLoc: PropTypes.bool
}

const mapStateToProps = state => ({
    place: state.map.place,
    loadingLoc: state.map.loading
})

export default connect(mapStateToProps, { getPlace })(React.memo(ControlPanel));