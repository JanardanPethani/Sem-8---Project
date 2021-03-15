import * as React from 'react';

import './Control-panel.css'

const eventNames = ['onDragEnd'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}


function ControlPanel(props) {
    return (
        <div className="control-panel">
            <div>
                {eventNames.map(eventName => {
                    const { events = {} } = props;
                    const lngLat = events[eventName];
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

export default React.memo(ControlPanel);