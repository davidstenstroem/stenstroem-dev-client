import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Section } from '../components/Section'

export const Dashboard: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => (
  <Section>
    <h1>Dashboard</h1>
  </Section>
)
