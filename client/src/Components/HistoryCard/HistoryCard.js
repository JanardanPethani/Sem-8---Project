import React, { Fragment } from 'react'
import Card from './Card'

const MatchCard = ({ data }) => {
  const html = data.map((ride, indx) => {
    return <Card key={indx} data={ride} />
  })

  return <Fragment>{html}</Fragment>
}

export default MatchCard
