import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  rootC: {
    marginTop: '2rem',
    marginBottom: '6rem',
  },
}))

const NotFound = () => {
  const classes = useStyles()

  return (
    <Container className={classes.rootC}>
      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            src='./imgs/404.png'
            style={{ width: '40%', height: 'auto' }}
            alt='404'
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Link
            to='/'
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontWeight: '500',
              fontSize: '2rem',
              color: 'rgb(5, 71, 82)',
            }}
          >
            Go Home
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound
