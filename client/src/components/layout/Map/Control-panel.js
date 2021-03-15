import * as React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Control-panel.css'

import { getPlace } from '../../../store/actions/map'


const eventNames = ['onDragEnd'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}


function ControlPanel({ events, getPlace }) {
    return (
        <div className="control-panel">
            <div>
                {eventNames.map(eventName => {
                    const lngLat = events[eventName];
                    // console.log(lngLat);
                    // getPlace(lngLat)
                    return (
                        <div key={eventName}>
                            <strong>Place:</strong> {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    place: state.map.place
})

export default connect(mapStateToProps, { getPlace })(React.memo(ControlPanel));