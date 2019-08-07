export class Account {
  id: string
  name: string
  email: string

  constructor(id: string, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }

  static userFromStorage(): Account {
    const accObject = localStorage.getItem('account')
    if (accObject) {
      const acc = JSON.parse(accObject)
      return new Account(acc.id, acc.name, acc.email)
    }
    return undefined
  }
}
