import React, { useState, useCallback, Fragment } from 'react'

// MapBox Imports
import MapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import Pin from './Pin';
import ControlPanel from './Control-panel';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamFuYXJkYW4xNyIsImEiOiJja2x0OXkycW8wYXhkMm9uOHZrajFsZ3M0In0.5eBpRfGUyCxjRV9JY9s97w'

const Map = () => {
    const geolocateControlStyle = {
        left: 10,
        top: 110
    };
    const navStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px'
    };

    const [viewport, setViewport] = useState({
        latitude: 21.1702,
        longitude: 72.8311,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
    });

    const [marker, setMarker] = useState({
        latitude: 21.1702,
        longitude: 72.8311,
    });
    const [events, logEvents] = useState({});

    // const onMarkerDragStart = useCallback(event => {
    //     logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
    // }, []);

    // const onMarkerDrag = useCallback(event => {
    //     logEvents(_events => ({ ..._events, onDrag: event.lngLat }));
    // }, []);

    const onMarkerDragEnd = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    }, []);


    return (
        <Fragment>
            <MapGL
                mapboxApiAccessToken={MAPBOX_TOKEN}
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={setViewport}
            >
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    showAccuracyCircle={false}
                    onGeolocate={(loc) => {
                        console.log(loc);
                    }}
                    auto={false}
                />
                <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    draggable
                    onDragEnd={onMarkerDragEnd}
                >
                    <Pin size={20} />
                </Marker>

                <div style={navStyle}>
                    <NavigationControl />
                </div>
            </MapGL>
            <ControlPanel events={events} />
        </Fragment >
    );
};

export default Map
