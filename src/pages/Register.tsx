import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { RegisterInput, RegisterComponent } from '../graphql-types'
import { MainContextState, MainContext } from '../context/MainContext'
import { Formik, Field } from 'formik'
import { Section } from '../components/Section'
import { Columns, Column } from '../components/columns'
import { registerSchema } from '@stenstroem/shared'
import { Account } from '../utils/Account.model'
import { faEnvelope, faUser, faKey } from '../utils/icons'
import { InputField } from '../components/InputField'
import classnames from 'classnames'

export const Register: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => {
  let formRef: Formik<RegisterInput>

  const { setAccount } = React.useContext<MainContextState>(MainContext)

  const initValues: RegisterInput = {
    email: '',
    password: '',
    name: '',
  }

  const handleReturnKey = (e: React.KeyboardEvent<any>): void => {
    if (e.keyCode === 13) {
      e.preventDefault()
      formRef.submitForm()
    }
  }

  return (
    <RegisterComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
              <Formik<RegisterInput>
                ref={(el): Formik<RegisterInput> => (formRef = el)}
                validationSchema={registerSchema}
                initialValues={initValues}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({ variables: { input: values } })
                    .then(
                      (response): void => {
                        if (response && response.data.register.formErrors) {
                          response.data.register.formErrors.forEach(
                            (err): void => {
                              actions.setFieldError(err.path, err.message)
                            }
                          )
                        } else if (response && response.data.register.user) {
                          const user = response.data.register.user
                          localStorage.setItem('account', JSON.stringify(user))
                          setAccount(Account.userFromStorage())
                        }
                      }
                    )
                    .catch(
                      (err): void => {
                        console.log(err)
                        actions.resetForm({
                          password: '',
                          email: values.email,
                          name: values.name,
                        })
                      }
                    )
                    .finally(
                      (): void => {
                        actions.setSubmitting(false)
                      }
                    )
                }}
              >
                {({ submitForm, isSubmitting }): JSX.Element => (
                  <div onKeyDown={handleReturnKey}>
                    <Field
                      type="email"
                      name="email"
                      label="Email"
                      icon={faEnvelope}
                      placeholder="din@email.com"
                      component={InputField}
                    />
                    <Field
                      type="text"
                      name="name"
                      label="Navn"
                      icon={faUser}
                      placeholder="dit navn"
                      component={InputField}
                    />
                    <Field
                      type="password"
                      name="password"
                      label="Kode"
                      icon={faKey}
                      placeholder="din adgangskode"
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
                      Registrer
                    </button>
                  </div>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </RegisterComponent>
  )
}
