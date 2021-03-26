import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendRequest, matchRides } from '../../store/actions/request'

import Map from '../layout/Map/Map'
import GMap from '../layout/GoogleMap/Map'
import MatchCard from '../../Components/MatchCard/MatchCard'

//TODO: Select type -> seats

const RequestForm = ({ sendRequest, history, matchRides, matchesArray }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departAt: '',
  })

  const [getMatch, setMatch] = useState(false)

  const { from, to, departAt } = formData

  const onChange = (e) => {
    if (e.target.name === 'departAt') {
      // Only in chrome
      const currDate = new Date().getDate()
      const currTime = new Date().getTime()

      const dateTime = new Date(e.target.value)
      const date = dateTime.getDate()
      const time = dateTime.getTime()
      console.log('From Request Form: ' + date + ' ' + time)
      // 60000 ->9 * 60 * 1000 -> 9 min
      if (date - currDate >= 0 && time - currTime >= 540000) {
        console.log('DateDiff is ok:' + (date - currDate))
        console.log('TimeDiff is ok:' + (time - currTime))
        setFormData({ ...formData, [e.target.name]: e.target.value })
      } else {
        setFormData({ ...formData, [e.target.name]: '' })
        alert('Please select proper date/time')
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendRequest(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Request a ride</h1>
      <div className='grid'>
        <div className='relative h-96  shadow-lg rounded-lg overflow-hidden'>
          <GMap />
        </div>

        <div className='relative mt-5 mb-5 shadow-lg p-4 rounded-lg'>
          <p className='lead'>Add details</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Pickup Location'
                name='from'
                value={from}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>Pickup point</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Destination Location'
                name='to'
                value={to}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>Destination point</small>
            </div>
            <div className='form-group'>
              <input
                type='datetime-local'
                name='departAt'
                value={departAt}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Date/Time{' '}
                <span className='bg-yellow-100 pl-2 pr-2 rounded-md'>
                  Set time after 10 min from {new Date().toString()}
                </span>
              </small>
            </div>

            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>

        <div className='flex max-w-full'>
          {from !== '' ? (
            <Fragment>
              {!getMatch ? (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setMatch(true)
                    if (!getMatch) {
                      matchRides(from)
                    }
                  }}
                >
                  Get Matching Offers
                </button>
              ) : (
                ''
              )}
              {getMatch ? (
                <div className='text-center container my-5 mx-auto px-4 md:px-12'>
                  <button
                    onClick={() => {
                      setMatch(false)
                    }}
                  >
                    <i className='fas fa-times-circle text-3xl'></i>
                  </button>
                  <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                    {/*//TODO click={sendReq} - send to offer owner*/}
                    <MatchCard array={matchesArray} />
                  </div>
                </div>
              ) : (
                ''
              )}
            </Fragment>
          ) : (
            'Enter Pickup point first'
          )}
        </div>
      </div>
    </Fragment>
  )
}

RequestForm.propTypes = {
  sendRequest: PropTypes.func.isRequired,
  matchRides: PropTypes.func.isRequired,
  matchesArray: PropTypes.array,
}

const mapStateToProps = (state) => ({
  matchesArray: state.profile.currRequestMatches,
})

export default connect(mapStateToProps, { sendRequest, matchRides })(
  withRouter(RequestForm)
)
