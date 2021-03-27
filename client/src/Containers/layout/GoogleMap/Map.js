import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api'

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete'
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox'
// import '@reach/combobox/styles.css'

import { getPlace, clearPlace } from '../../../store/actions/map'

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
    googleMapsApiKey: 'AIzaSyAsNQOdQUN9Nx_AAAoS3JHV5mLzcPA0rQ0',
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

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  }, [])

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading maps'

  return (
    <div className='relative h-96'>
      {/* <Search /> */}
      <Locate panTo={panTo} setMarker={setMarkers} />
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
    </div>
  )
}

const Locate = ({ panTo, setMarker }) => {
  return (
    <button
      className='absolute top-2 p-1 z-10 right-1 h-10 w-10 bg-white rounded-lg'
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (positions) => {
            panTo({
              lat: positions.coords.latitude,
              lng: positions.coords.longitude,
            })
            setMarker((current) => {
              if (current.length > 1) {
                current.pop()
              }
              return [
                ...current,
                {
                  lat: positions.coords.latitude,
                  lng: positions.coords.longitude,
                  time: new Date(),
                },
              ]
            })
          },
          () => null,
          options
        )
      }}
    >
      <img src='./maps-and-flags.svg' alt='Marker' />
    </button>
  )
}

// function Search() {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestion,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 21.1702, lng: () => 72.8311 },
//       radius: 30 * 1000,
//     },
//   })

//   return (
//     <div className='absolute top-2 p-1 z-10 left-1/4 lg:left-12 transform-gpu scale-150'>
//       <Combobox
//         onSelect={(address) => {
//           console.log(address)
//         }}
//       >
//         <ComboboxInput
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value)
//           }}
//           disabled={!ready}
//           placeholder='Enter address'
//         />
//         <ComboboxPopover>
//           {status === 'Ok' &&
//             data.map(({ id, description }) => {
//               console.log(description)
//               return <ComboboxOption key={id} value={description} />
//             })}
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   )
// }

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
