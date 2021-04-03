import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

const NotFound = () => (
  <div>
    <Grid container spacing={5}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <img src='./imgs/404.png' style={{ width: '40%', height: 'auto' }} />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
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
  </div>
)

export default NotFound
