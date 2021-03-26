import React from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPlace, clearPlace } from '../../../store/actions/map'

const { REACT_APP_GMAP_API_KEY } = process.env
const containerStyle = {
  width: 'inherit',
  height: 'inherit',
}

const center = {
  lat: 21.1702,
  lng: 72.8311,
}

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const libraries = ['places']

const Map = ({ place, getPlace, loadingLoc, clearPlace }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GMAP_API_KEY,
    libraries,
  })
  const [markers, setMarkers] = React.useState([])
  const [selected, setSelected] = React.useState(null)

  const onMapClick = React.useCallback((event) => {
    new Date()
    setMarkers((current) => {
      if (current.length > 1) {
        current.shift()
      }
      return [
        ...current,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]
    })
  }, [])

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading maps'

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: './placeholder.svg',
            scaledSize: new window.google.maps.Size(20, 20),
            origin: new window.google.maps.Point(0, 0),
          }}
          onClick={() => {
            setSelected(marker)
            getPlace(marker.lat, marker.lng)
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null)
            clearPlace()
          }}
        >
          <div>
            <p> {!loadingLoc ? `${place.place}` : <em>loading</em>}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  )
}

Map.prototype = {
  getPlace: PropTypes.func.isRequired,
  clearPlace: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  loadingLoc: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  place: state.map.place,
  loadingLoc: state.map.loading,
})

export default connect(mapStateToProps, { getPlace, clearPlace })(Map)
