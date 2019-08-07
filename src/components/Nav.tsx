import * as React from 'react'
import { MainContextState, MainContext } from '../context/MainContext'
import classnames from 'classnames'
import { Logo } from './Logo'
import { NavItem } from './NavItem'
import { NavButtons } from '../utils/NavButtons'
import { faUpload, FontAwesomeIcon } from '../utils/icons'

export const Nav: React.FunctionComponent = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false)
  const toggle = (): void => {
    setOpen(!open)
  }

  const { account } = React.useContext<MainContextState>(MainContext)

  return (
    <nav className="navbar has-shadow is-spaced">
      <div className="container">
        <div className="navbar-brand">
          <Logo />

          {account && (
            <a
              role="button"
              className={classnames('navbar-burger', open && 'is-active')}
              onClick={toggle}
            >
              <span />
              <span />
              <span />
            </a>
          )}
        </div>
        <div className={classnames('navbar-menu', open && 'is-active')}>
          {account && (
            <div className="navbar-start">
              {NavButtons.map(
                (itemConfig, index): JSX.Element => (
                  <NavItem key={index} {...itemConfig} />
                )
              )}
            </div>
          )}
        </div>

        {/* TODO: add button / dropdown for user account, logout etc */}
      </div>
    </nav>
  )
}
