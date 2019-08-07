import * as React from 'react'
import { FieldProps } from 'formik'
import classnames from 'classnames'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeIcon,
  faExclamationCircle,
  isDefaultColor,
} from '../utils/icons'

export const InputField: React.FunctionComponent<
  FieldProps<any> & {
    type: string
    label: string
    placeholder?: string
    icon?: IconDefinition
    iconColor?: string
    infoIcon?: IconDefinition
  }
> = ({ field, form: { touched, errors }, ...props }): JSX.Element => {
  const errorMsg = touched[field.name] && errors[field.name]
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div
        className={classnames(
          'control',
          props.icon ? 'has-icons-left' : null,
          errorMsg ? 'has-icons-right' : null,
          props.infoIcon ? 'has-icons-right' : null
        )}
      >
        <input
          {...field}
          className="input"
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : undefined}
        />
        {props.infoIcon ? (
          <span className="is-small is-right has-text-warning icon">
            <FontAwesomeIcon
              icon={props.infoIcon}
              color={props.iconColor || isDefaultColor}
            />
          </span>
        ) : null}
        {props.icon ? (
          <span className="is-small is-left icon">
            <FontAwesomeIcon
              icon={props.icon}
              color={props.iconColor || isDefaultColor}
            />
          </span>
        ) : null}
        {errorMsg ? (
          <span className="icon is-right is-small">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              color={props.iconColor}
            />
          </span>
        ) : null}
      </div>
      <p className={classnames('help', errorMsg ? 'is-danger' : null)}>
        {errorMsg || <span>&#8203;</span>}
      </p>
    </div>
  )
}
