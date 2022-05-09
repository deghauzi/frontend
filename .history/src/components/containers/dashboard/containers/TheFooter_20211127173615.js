import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://deghauzimicrolending.com/">
        De-Ghauzi Microlending
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </CFooter>
  )
}

export default React.memo(TheFooter)
