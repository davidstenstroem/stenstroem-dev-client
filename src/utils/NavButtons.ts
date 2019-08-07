export interface NavButton {
  path: string
  text: string
  to: string
}

export const NavButtons: NavButton[] = [
  {
    path: '/album/*',
    text: 'Album',
    to: '/album',
  },
]
