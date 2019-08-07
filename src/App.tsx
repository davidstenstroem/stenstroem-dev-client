import * as React from 'react'
import { Account } from './utils/Account.model'
import { MainContext } from './context/MainContext'
import { Router } from '@reach/router'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Nav } from './components/Nav'

export const App: React.FunctionComponent = (): JSX.Element => {
  const [account, setAccount] = React.useState<Account>(
    Account.userFromStorage()
  )

  return (
    <div className="app">
      <MainContext.Provider value={{ account, setAccount }}>
        <Nav />
        <main>
          <MainContext.Consumer>
            {({ account }): JSX.Element => {
              if (account) {
                return (
                  <Router primary={false}>
                    <Dashboard path="/" />
                  </Router>
                )
              }
              return (
                <Router primary={false}>
                  <Login default path="/login" />
                  <Register path="/register" />
                </Router>
              )
            }}
          </MainContext.Consumer>
        </main>
        <Footer />
      </MainContext.Provider>
    </div>
  )
}
