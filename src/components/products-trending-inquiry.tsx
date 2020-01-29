/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { API } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import { Modal, Form, Button, Icon } from 'semantic-ui-react'
import theme from '../../config/theme'
import { useInput } from '../utils/form-input/form-input'
import { createVisitorInquiry } from '../utils/graphql'

const UpdateButton = styled.div`
  background-color: ${theme.colors.mlightgrey};
  text-align: center;
  padding: 18px 0;
  color: #000;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: Quicksand, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: bold;
  cursor: pointer;
`

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrendingInquiry = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore }: IProps): JSX.Element => {
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('')
    const { value: descr, bind: bindDescr, reset: resetDescr } = useInput('')

    const [isShown, setIsShown] = useState(false)
    const show = () => setIsShown(true)
    const hide = (event: React.SyntheticEvent) => {
      event.preventDefault()
      setIsShown(false)
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault()

      // close the modal right away
      hide(event)

      if (email && email.includes('@')) {
        const emailname = email.substring(0, email.lastIndexOf('@'))

        // SNS to site admin: IAM without authentication or Cognito as users-group
        try {
          await API.graphql({
            query: createVisitorInquiry,
            variables: {
              input: {
                sender: email,
                subject: `Trending items inquiry form in stream ${emailname}`,
                message: descr,
              },
            },
            authMode: userStore.isLoggedIn ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
          })
          resetEmail()
          resetDescr()
        } catch (err) {
          console.log('Error: ', err)
        }
      }
    }

    const trendingFormTrigger: JSX.Element = (
      <UpdateButton onClick={show}>
        Trending items updated weekly
        <Icon name="angle down" color="black" />
      </UpdateButton>
    )

    return (
      <Modal
        as={Form}
        open={isShown}
        size="small"
        style={{ maxWidth: 500 }}
        onSubmit={handleSubmit}
        trigger={trendingFormTrigger}
      >
        <Modal.Header>Looking for something specific?</Modal.Header>
        <Modal.Content>
          <Form.Input {...bindEmail} required label="Email" type="email" />
          <Form.TextArea {...bindDescr} required label="What are you looking for?" />
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" color="black" content="Send" />
          <Button onClick={hide} color="grey" content="Cancel" />
        </Modal.Actions>
      </Modal>
    )
  }
)

export default TrendingInquiry
