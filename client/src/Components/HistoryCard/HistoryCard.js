import React, { Fragment } from 'react'
import Card from './Card'

const MatchCard = ({ data }) => {
  const html = data.map((ride, indx) => {
    return <Card key={indx} data={ride} />
  })
  console.log(html)
  return (
    <Fragment>
      {html.length > 0 ? (
        html
      ) : (
        <h1 className='text-lg font-medium text-center'>No ride data</h1>
      )}
    </Fragment>
  )
}

export default MatchCard
