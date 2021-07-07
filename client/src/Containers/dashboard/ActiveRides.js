import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import easyinvoice from 'easyinvoice'

import Spinner from '../../Components/Spinner/Spinner'

import { paymentReceived, deleteReceMsg } from '../../store/actions/offer'

import getStatus from '../../utils/getActiveRideStatus'
import getTimeInfo from '../../utils/getTimeInfo'

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const __DEV__ = document.domain === 'localhost'

const ActiveRide = ({
  activeRide,
  auth,
  paymentReceived,
  history,
  deleteReceMsg,
}) => {
  const [loading, setLoading] = useState(false)

  const ride = activeRide[0]

  async function displayRazorpay(
    driver,
    dPhone,
    dEmail,
    pName,
    pEmail,
    pNumber,
    amount,
    from,
    to
  ) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Failed to load razorpay')
    }
    const values = {
      amount,
    }

    const order = await fetch('http://localhost:3000/api/pay/razorpay', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-type': 'application/json' },
    }).then((t) => t.json())

    const options = {
      key: __DEV__ ? 'rzp_test_KYByohjsvvTjqS' : 'PRODUCTION_KEY', // Enter the Key ID generated from the Dashboard
      name: driver,
      currency: order.currency,
      amount: order.amount,
      description: 'Test Transaction',
      // image: 'https://example.com/your_logo',
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: (response) => {
        function getSampleData(custom = 5) {
          return {
            documentTitle: 'RECEIPT', //Defaults to INVOICE
            currency: order.currency,
            // taxNotation: 'vat', //or gst
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 25,
            //"logoExtension": "png", //only when logo is base64
            sender: {
              company: 'Get your ride',
              address: 'Sample Street 123',
              zip: '1234 AB',
              city: 'Surat',
              country: 'India',
              //"custom1": "custom value 1",
              //"custom2": "custom value 2",
              //"custom3": "custom value 3"
            },
            client: {
              company: 'Driver: ' + driver,
              address: dPhone,
              zip: dEmail,
              city: '',
              country: '',
              custom1: `<div style="font-weight:bold;">Passanger: ${pName} </div>`,
              custom2: pNumber,
              custom3: pEmail,
            },
            invoiceNumber: response.razorpay_payment_id,
            invoiceDate: new Date().toDateString(),
            products: [
              {
                quantity: `${from}`,
                description: `${to}`,
                tax: '0',
                price: amount,
              },
            ],
            bottomNotice: 'Thank you for using our service.',
          }
        }

        const data = getSampleData()
        easyinvoice.createInvoice(data, function (result) {
          setLoading(false)
          easyinvoice.download('myInvoice.pdf')
        })
        
      },
      prefill: {
        name: pName,
        email: pEmail,
        contact: pNumber,
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <Fragment>
      {activeRide.length !== 0 ? (
        <div className='max-w-lg mx-auto bg-white border-1  mt-4 mb-3 rounded-md tracking-wide shadow-md overflow-hidden'>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {' '}
              <h2 className='p-2 bg-gray-100 text-xl text-center font-medium'>
                Active Ride
              </h2>
              {/* name */}
              <div className='flex flex-row justify-center m-3'>
                <div className=' m-2'>
                  <h5 className='font-semibold text-primaryColor '>Driver</h5>
                  <h4 className='text-xl font-semibold'>
                    {`${ride.to.firstname} ${ride.to.lastname}`}
                  </h4>
                </div>
                <div className='border-r-2 m-2'></div>
                <div className=' m-2'>
                  <h5 className='font-semibold text-primaryColor '>
                    Passenger
                  </h5>
                  <h4 className='text-xl font-semibold'>
                    {`${ride.reqBy.firstname} ${ride.reqBy.lastname}`}
                  </h4>
                </div>
              </div>
              {/* Data */}
              <div className='flex flex-col justify-items-center mt-3'>
                <div className='divide-y divide-gray p-4'>
                  <div className='flex p-4 text-left'>
                    <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                      From :
                    </div>
                    <div className='self-center text-left  ml-2'>
                      {ride.forWhich.from}
                    </div>
                  </div>
                  <div className='flex p-4 text-left'>
                    <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                      To :
                    </div>
                    <div className='self-center text-left  ml-2'>
                      {ride.forWhich.to}
                    </div>
                  </div>
                  <div className='flex p-4 text-left'>
                    <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                      Depart Time :
                    </div>
                    <div className='self-center text-left  ml-2'>
                      {getTimeInfo(ride.forWhich.departAt)}
                    </div>
                  </div>
                  <div className='flex p-4 text-left'>
                    <div className='w-1/4 flex-shrink-0  lg:pl-3 md:px-0 text-sm font-medium self-center'>
                      Status :
                    </div>
                    <div className='self-center text-left  ml-2'>
                      {getStatus(ride.forWhich.departAt)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment received button */}
              {auth.user.email === ride.to.email ? (
                <div>
                  <span className='flex flex-row justify-center text-gray-500 text-center pl-2 pr-2 rounded-md text-xs'>
                    Click after ride & payment completion.
                  </span>
                  <Grid container>
                    <Grid item xs={6}>
                      <div
                        className='flex flex-row justify-center  p-3 bg-green-50 hover:bg-green-400 hover:text-white cursor-pointer border-t-2'
                        onClick={() => paymentReceived(ride._id)}
                      >
                        Payment Received
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div
                        className='flex flex-row justify-center  p-3 bg-red-50 hover:bg-red-400 hover:text-white cursor-pointer border-t-2'
                        onClick={() => deleteReceMsg(ride._id)}
                      >
                        Cancel
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <div>
                  <span className='flex flex-row justify-center text-gray-500 text-center pl-2 pr-2 rounded-md text-xs'>
                    Pay after ride completion & wait for receipt to generate
                  </span>
                  <div
                    className='flex flex-row justify-center  p-3 bg-green-50 hover:bg-green-400 hover:text-white cursor-pointer border-t-2'
                    onClick={() => {
                      displayRazorpay(
                        `${ride.to.firstname} ${ride.to.lastname}`,
                        ride.to.phone,
                        ride.to.email,
                        `${ride.reqBy.firstname} ${ride.reqBy.lastname}`,
                        ride.reqBy.email,
                        ride.reqBy.phone,
                        ride.forWhich.price,
                        ride.forWhich.from,
                        ride.forWhich.to
                      )
                      setLoading(true)
                    }}
                  >
                    Pay
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Grid>
          <img src='./imgs/NoRide.png' alt='No ride' />
          <Typography
            variant='h5'
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontWeight: '500',
              color: 'rgb(5, 71, 82)',
            }}
          >
            No active ride
          </Typography>
        </Grid>
      )}
    </Fragment>
  )
}

ActiveRide.propTypes = {
  auth: PropTypes.object.isRequired,
  paymentReceived: PropTypes.func.isRequired,
  deleteReceMsg: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { paymentReceived, deleteReceMsg })(
  withRouter(ActiveRide)
)
