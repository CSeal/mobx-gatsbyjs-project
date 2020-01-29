import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Segment, Header, List, Button, Icon, Form, Message, Divider } from 'semantic-ui-react'
import { UserSettingsOperationType } from '../types'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { useInput } from '../utils/form-input/form-input'


const UserSettings = ({userStore}: any):JSX.Element => {
  const [loading, setStateLoading] = useState(false);
  const [error, setStateError] = useState('');

  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:authCode, bind:bindAuthCode, reset:resetAuthCode } = useInput('');
  const { value:oldPassword, bind:bindOldPassword, reset:resetOldPassword } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const { value:confirmPassword, bind:bindConfirmPassword, reset:resetConfirmPassword } = useInput('');

  useEffect(() => {
        userStore.refreshAWSUser(true).then(() => {
          if (!userStore.isLoggedIn) {
            userStore.userLogOut()
            return
          }
          if (!userStore.isUserEmailVerified) {
            userStore.setUserSettingsOperationType(UserSettingsOperationType.activateEmail)
          }
        })
  }, []);

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      userStore.userLogOut()
    }
  }, [userStore.isLoggedIn])

  const activatePasswordForm = () => {
    setStateError('');
    userStore.setUserSettingsOperationType(UserSettingsOperationType.changePassword)
  }

  const changeEmailForm = () => {
    userStore.setUserSettingsOperationType(UserSettingsOperationType.changeEmail)
  }

  const cancelPasswordForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    resetOldPassword();
    resetPassword();
    resetConfirmPassword();
    setStateError('');
    userStore.setPasswordWasChanged(false)
    userStore.setUserSettingsOperationType(UserSettingsOperationType.default);
  }
  const clearAllState = ():void => {
    resetOldPassword()
    resetPassword()
    resetConfirmPassword()
    userStore.setPasswordWasChanged(false)
    userStore.setEmailChangeCodeSent(false)
    resetAuthCode()
    resetEmail()
    setStateError('');
  }
  const validatePasswordForm = () => {
    const password_chars_min = 6;
    if (password.length < password_chars_min) return 'New password is too short';
    if (password != confirmPassword) return 'Confirm password does not match';
    return '';
  }


  const cancelEmailForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    resetEmail();
    setStateError('');
    userStore.setUserSettingsOperationType(UserSettingsOperationType.default);
    userStore.refreshAWSUser(true)
  }

  const resendEmailConfirm = async (): Promise<void> => {
    // not re-sending if user is already verified
      try {
        setStateLoading(true)
        await Auth.verifyCurrentUserAttribute("email")
        userStore.setEmailChangeCodeSent(true)
        setStateError('')
        userStore.setUserSettingsOperationType(UserSettingsOperationType.activateEmail)
      } catch (err) {
        setStateError(err.message)
      } finally {
        setStateLoading(false);
      }
  }

  const handleChangeEmailSubmit = async():Promise<void> => {
      await userStore.setUserAttribute({ email:  email.toLowerCase()})
      resetEmail()
      userStore.setEmailChangeCodeSent(true)
      setStateError('')
      userStore.setUserSettingsOperationType(UserSettingsOperationType.activateEmail)
  }

  const handleVerifiEmailSubmit = async():Promise<void> => {
    await userStore.confirmUserAttribute("email", authCode);
    resetAuthCode();
    setStateError('');
    userStore.setUserSettingsOperationType(UserSettingsOperationType.default);
  }

  const handlePasswordChangeSubmit = async():Promise<void> => {
    const passwErr = validatePasswordForm();
    if (passwErr !== '') {
      throw({message: passwErr});
    } else {
      setStateError('');
    }
    await userStore.changePassword(oldPassword, password)
    userStore.setPasswordWasChanged(true)
    resetOldPassword()
    resetPassword()
    resetConfirmPassword()
    userStore.setUserSettingsOperationType(UserSettingsOperationType.default);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setStateLoading(true);
    try {
      switch(userStore.userSettingsOperationType) {
        case UserSettingsOperationType.changeEmail:
            await handleChangeEmailSubmit()
            break
        case UserSettingsOperationType.activateEmail:
            await handleVerifiEmailSubmit()
            break
        case UserSettingsOperationType.changePassword:
            await handlePasswordChangeSubmit()
            break
        default:
            userStore.setUserSettingsOperationType(UserSettingsOperationType.default);
            clearAllState()
      }
    } catch (err) {
      setStateError(err.message);
    }
    setStateLoading(false);
  }

  const renderContent = (loading: boolean): JSX.Element | null => {
    if (loading) {
      return (
        <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Loading</Message.Header>
          Please wait...
        </Message.Content>
      </Message>
      )
    }
    switch(userStore.userSettingsOperationType) {
      case UserSettingsOperationType.changeEmail:
        return (
          <Form
            error={error !== null && error !== ''}
            warning
            onSubmit={handleSubmit}>
              <Message error header='Error' content={error} />
              <Form.Input {...bindEmail} required label='New Email' type='email' />
              {
                error === '' && (
                  <Message warning>
                    <Icon name='info' />
                    Confirmation code will be sent to your new address.
                  </Message>
                )
              }
              <Button.Group>
                <Form.Button color="black" content="Submit" />
                <Button.Or />
                <Button onClick={cancelEmailForm} color="grey"
                  content="Cancel"
                />
            </Button.Group>
          </Form>
        )
      case UserSettingsOperationType.activateEmail:
        return (
          <Form
            error={error !== null && error !== ''}
            warning
            onSubmit={handleSubmit}>
              <Message error header='Error' content={error} />
              <Form.Input {...bindAuthCode} required label='Email verification code' type='text' />
              {
                userStore.emailChangeCodeSent && error === '' && (
                  <Message warning>
                    <Icon name='info' />
                    Confirmation code was sent.
                  </Message>
                )
              }
              <Button.Group>
                <Form.Button color="black" content="Submit" />
                <Button.Or />
                <Button onClick={changeEmailForm} color="grey"
                  content="Back"
                />
              </Button.Group>
          </Form>
        )
      case UserSettingsOperationType.changePassword:
        return (
          <Form
            error={error !== null && error !== ''}
            warning
            onSubmit={handleSubmit}>
              <Message error header='Error' content={error} />
                <Form.Input {...bindOldPassword} required label='Current password' type='password' />
                <Divider horizontal section>
                  <Icon name='key' />
                </Divider>
                <Form.Input {...bindPassword} required label='New password' type='password' />
                <Form.Input {...bindConfirmPassword} required label='Confirm password' type='password' />
                <Button.Group>
                  <Form.Button color="black" content="Submit" />
                  <Button.Or />
                  <Button onClick={cancelPasswordForm} color="grey"
                    content="Cancel"/>
                </Button.Group>
          </Form>
        )
      case UserSettingsOperationType.default:
      default:
        return userStore.isUserEmailVerified
            ? (<List>
                  <List.Item>
                    <Button animated='fade' onClick={changeEmailForm}>
                      <Button.Content visible><Icon name='mail' />{userStore.loginedUser.email}</Button.Content>
                      <Button.Content hidden>Change email</Button.Content>
                    </Button>
                  </List.Item>
                  {
                    userStore.passwordWasChanged && (<List.Item><p>Password changed successfully.</p></List.Item>)
                  }
                  <List.Item>
                    <Button onClick={activatePasswordForm}><Icon name='key' />Change password</Button>
                  </List.Item>
              </List>)
            : (<Message negative>
                  <Message.Header>Your email is not verified</Message.Header>
                  <p>Please verify <strong>{userStore.loginedUser.email}</strong> or <a style={{ cursor: "pointer" }} onClick={changeEmailForm}>update email</a></p>
                  <Button onClick={resendEmailConfirm} color="black" content="Resend code" />
                </Message>
              )
    }
  }

  return (
    <>
      <Segment>
        <Header as='h3'>User: {userStore.loginedUser.username}</Header>
        {
          renderContent(loading)
        }
      </Segment>
      <div style={{paddingTop: '20px'}} ></div>
  </>
  )
}

export default compose<any,any>(inject('userStore'), observer)(UserSettings)
