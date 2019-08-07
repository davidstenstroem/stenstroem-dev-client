import * as React from 'react'
import classnames from 'classnames'
import { Match, Link } from '@reach/router'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '../utils/icons'

interface Props {
  path: string
  text: string
  to: string
  isButton?: boolean
  icon?: IconDefinition
}

export const NavItem: React.FunctionComponent<Props> = ({
  path,
  text,
  to,
  isButton,
  icon,
}): JSX.Element => (
  <Match path={path}>
    {(props): JSX.Element => (
      <Link
        to={to}
        className={classnames(
          'navbar-item',
          isButton && 'button',
          props.match && 'is-active'
        )}
      >
        {icon && (
          <span className="icon">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <span>{text}</span>
      </Link>
    )}
  </Match>
)
