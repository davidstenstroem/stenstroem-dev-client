import * as React from 'react'
import { Link } from '@reach/router'
import { faHexagon, FontAwesomeIcon, faBolt } from '../utils/icons'

export const Logo: React.FunctionComponent = (): JSX.Element => {
  return (
    <Link to="/" className="navbar-item">
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={faHexagon} transform="grow-5" />
        <FontAwesomeIcon
          icon={faBolt}
          transform="shrink-2"
          style={{ color: 'yellow' }}
        />
      </span>
    </Link>
  )
}
