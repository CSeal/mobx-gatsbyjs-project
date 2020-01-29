/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { navigate as navigateGatsby } from 'gatsby'
import { API } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Header, Form, Message } from 'semantic-ui-react'
import { useInput } from '../utils/form-input/form-input'
import { createVisitorInquiry } from '../utils/graphql'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HelpForm = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore }: IProps): JSX.Element => {
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('')
    const { value: descr, bind: bindDescr, reset: resetDescr } = useInput('')

    const [loading, setStateLoading] = useState(false)
    const [error, setStateError] = useState('')

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!email && !email.includes('@')) {
        setStateError('Please enter a valid email address')
        return
      }
      const emailname = email.substring(0, email.lastIndexOf('@'))
      setStateError('')
      setStateLoading(true)

      // SNS to site admin: IAM without authentication or Cognito as users-group
      try {
        await API.graphql({
          query: createVisitorInquiry,
          variables: {
            input: {
              sender: email,
              subject: `Help request form submission ${emailname}`,
              message: descr,
            },
          },
          authMode: userStore.isLoggedIn ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
        })
        resetEmail()
        resetDescr()
        setStateLoading(false)
        navigateGatsby(`/`)
      } catch (err) {
        setStateError('Error submitting your input. Please refresh this page and try again.')
      }

      setStateLoading(false)
    }

    return (
      <>
        <Segment>
          <Header as="h3">Contact support</Header>
          <Form error={error !== null && error !== ''} style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
            <Message error header="Error" content={error} />
            <Form.Input {...bindEmail} required label="Email" type="email" />
            <Form.TextArea {...bindDescr} required label="Message" />
            <Form.Button loading={loading} color="black" content="Submit" />
          </Form>
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default HelpForm
