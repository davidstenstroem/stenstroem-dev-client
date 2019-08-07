import * as React from 'react'
import { Account } from '../utils/Account.model'

export interface MainContextState {
  account?: Account
  setAccount?: React.Dispatch<React.SetStateAction<Account>>
}

export const MainContext = React.createContext<MainContextState>(null)
