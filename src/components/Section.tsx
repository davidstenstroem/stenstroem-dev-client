import * as React from 'react'

interface Props {
  children?: React.ReactChild[] | React.ReactChild
}

export const Section: React.FunctionComponent<Props> = ({
  children,
}: Props): JSX.Element => (
  <section className="section">
    <div className="container">{children}</div>
  </section>
)
