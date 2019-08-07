import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { MainContextState, MainContext } from '../context/MainContext'
import { LoginInput, LoginComponent } from '../graphql-types'
import { Section } from '../components/Section'
import { Columns, Column } from '../components/columns'
import { Formik, Field } from 'formik'
import { loginSchema } from '@stenstroem/shared'
import { Account } from '../utils/Account.model'
import { InputField } from '../components/InputField'
import classnames from 'classnames'
import { faKey, faEnvelope } from '../utils/icons'

export const Login: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => {
  let formRef: Formik<LoginInput>
  const { setAccount } = React.useContext<MainContextState>(MainContext)

  const handleReturnKey = (e: React.KeyboardEvent<any>): void => {
    if (e.keyCode === 13) {
      e.preventDefault()
      formRef.submitForm()
    }
  }

  const initialValues: LoginInput = {
    email: '',
    password: '',
  }

  return (
    <LoginComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
              <Formik<LoginInput>
                ref={(el): Formik<LoginInput> => (formRef = el)}
                validationSchema={loginSchema}
                initialValues={initialValues}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({ variables: { input: values } })
                    .then(
                      (response): void => {
                        if (response && response.data.login.formErrors) {
                          response.data.login.formErrors.forEach(
                            (err): void =>
                              actions.setFieldError(err.path, err.message)
                          )
                        } else if (response && response.data.login.user) {
                          const user = response.data.login.user
                          localStorage.setItem(
                            'account',
                            JSON.stringify({ ...user })
                          )
                          setAccount(Account.userFromStorage())
                        }
                      }
                    )
                    .catch(
                      (err): void => {
                        actions.resetForm({ password: '', email: values.email })
                      }
                    )
                    .finally((): void => actions.setSubmitting(false))
                }}
              >
                {({ submitForm, isSubmitting }): JSX.Element => (
                  <div onKeyDown={handleReturnKey}>
                    <Field
                      type="email"
                      name="email"
                      icon={faEnvelope}
                      label="Email"
                      placeholder="din@email.com"
                      component={InputField}
                    />{' '}
                    <Field
                      type="password"
                      name="password"
                      icon={faKey}
                      placeholder="din adgangskode"
                      label="Kode"
                      component={InputField}
                    />
                    <p>&nbsp;</p>
                    <button
                      className={classnames(
                        'button is-link is-fullwidth',
                        isSubmitting ? 'is-loading' : null
                      )}
                      type="submit"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Log ind
                    </button>
                  </div>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </LoginComponent>
  )
}
