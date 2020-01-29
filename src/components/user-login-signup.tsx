import React from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { Modal, Form, Button, Message, Icon, Divider } from 'semantic-ui-react'
import { useNewInput } from '../utils/form-input/form-input'
import { navigate } from 'gatsby'
import { formInitialState as signupLoginInitState, reducer, actionHandlers, errorsToString} from '../utils/form-input/presets/signup-login-form'
import { setUser } from '../utils/auth'
import { observer, inject } from 'mobx-react'
import { SignUpLoginModalShowType } from '../types'
import compose from 'recompose/compose'

const HeaderButtonsArea = styled.div`
  padding-left: 0px;
`;

const assembleUsername = (fname:string, lname: string) => {
  const first = fname.toLowerCase().replace(/[^0-9a-z]/g, '');
  const last = lname.toLowerCase().replace(/[^0-9a-z]/g, '');
  return `${first}_${last}`;
}

interface IGetUserSignUp {
  isUserSignUp: boolean,
  error: string,
  signUpUserName: string
}

export const UserLoginSignupBtnPanel = compose<any, any>(inject('userStore'), observer)
(({userStore}: any): JSX.Element => {
    return (<HeaderButtonsArea>
        <Button color="black" content="Join" onClick={userStore.modalOpenAsSignUp} />
        <Button color="orange" content="Login" onClick={userStore.modalOpenAsLogin} />
      </HeaderButtonsArea>
    )
})

export const UserLoginSignupModal = compose<any, any>(inject('userStore'), observer)
(({userStore}: any ): JSX.Element => {
    const {
      values,
      withShortErrorMessage,
      inputChangeHandler,
      checkboxChangeHandler,
      dataLoading,
      resetAllValues,
      signUpSuccess,
      inputAuthCodeSuccess,
      userLoginSuccess,
      resendSignUpSuccess,
      setError,
      dataLoaded
      } = useNewInput(signupLoginInitState, reducer, actionHandlers);
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      authCode,
      loading,
      error,
      acceptTerms,
      loginPassword,
      resetCode,
      newPassword,
      confirmPassword
    } = values;

     //TODO consider moving stage and createdUsername into the global store

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
      event.preventDefault()
      event.stopPropagation()
      dataLoading()
      switch (userStore.signInOutModalStage) {
        case SignUpLoginModalShowType.SignUp:
          await signUp()
          break
        case SignUpLoginModalShowType.VerifyCode:
          await confirmSignUp()
          break
        case SignUpLoginModalShowType.Login:
          await login()
          break
        case SignUpLoginModalShowType.ResetPasswordInit:
          await resetPasswordInit()
          break
        case SignUpLoginModalShowType.ResetPasswordComplete:
          await resetPasswordComplete()
          break
        default:
          dataLoaded()
      }
    }
    const switchToLoginModalShow = ():void => {
      resetAllValues()
      userStore.modalOpenAsLogin()
    }

    const switchToSignUpModalShow = (): void => {
      resetAllValues()
      userStore.modalOpenAsSignUp()
    }

    const switchToForgotPassword = (): void => {
      resetAllValues()
      userStore.modalOpenAsResetPasswordInit()
    }

    const closeModalHandler = (event: React.SyntheticEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      if (userStore.forwardAfterCancel !== null) {
        navigate(userStore.forwardAfterCancel, { replace: true })
        resetAllValues()
        userStore.modalClose()
        return
      }
      if (!userStore.manualCancelModalClose) {
        return
      }
      resetAllValues()
      userStore.modalClose()
    }

    const signUp = async ():Promise<undefined> => {
      userStore.setPasswordChanged(false)
      if (!acceptTerms) {
        setError(withShortErrorMessage({
          error: 'Please accept the Terms to create your account.'
        }))
        return;
      }

      const getUserSignUp = async (username: string ,currentUserNameIndex:number):Promise<IGetUserSignUp> => {
        const lastUserNameIndex: number = 10;
        const userSignUpResult: IGetUserSignUp = {
          isUserSignUp: true,
          error: '',
          signUpUserName: currentUserNameIndex === 0 ? username : username + currentUserNameIndex
        }
        try {
          await Auth.signUp({ username: userSignUpResult.signUpUserName, password, attributes: { email }})
          return userSignUpResult;
        } catch(err) {
          userSignUpResult.isUserSignUp = false
          if (err.code !== 'UsernameExistsException') {
            userSignUpResult.error = err.message
            return userSignUpResult
          } else if(err.code === 'UsernameExistsException' && currentUserNameIndex > lastUserNameIndex) {
            userSignUpResult.error = 'Account not created: please check your input.'
            return userSignUpResult
          }
          const nextUserNameIndex:number = currentUserNameIndex + 1
          return getUserSignUp(username, nextUserNameIndex)
        }
      }

      const usernameTry: string = assembleUsername(firstname, lastname)
      const strartUserNameIndex: number = 0
      const userSignUpResult: IGetUserSignUp = await getUserSignUp(usernameTry, strartUserNameIndex)
      if (userSignUpResult.isUserSignUp) {
        signUpSuccess()
        userStore.setSignUpUserName(userSignUpResult.signUpUserName)
        userStore.modalOpenAsVerifyCode()
        return
      }
      setError(withShortErrorMessage({error: userSignUpResult.error}))
    }

    const confirmSignUp = async():Promise<undefined> => {
      let error = 'You didn`t input authentication code'
      if(authCode === '') {
        setError(withShortErrorMessage({error}))
        return
      }
      try {
        await Auth.confirmSignUp(userStore.signUpUserName, authCode, { forceAliasCreation: false });
        inputAuthCodeSuccess()
        userStore.setSignUpUserName('')
        userStore.changeNewSignupComplete()
        userStore.modalOpenAsLogin()

      } catch(err) {
        if (err.code === 'AliasExistsException') {
          error = 'The email you provided is already registered'
          setError(withShortErrorMessage({error}))
          userStore.setSignUpUserName('')
          userStore.modalOpenAsSignUp()
          return
        }
        error = err.message
        setError(withShortErrorMessage({error}))
      }
    }

    const resendSignUp = async() => {
      try {
        if (!userStore.signUpUserName) {
          console.error('signUpUserName is not defined')
          throw new Error('Unknow error');
        }
        await Auth.resendSignUp(userStore.signUpUserName)
        resendSignUpSuccess()
      } catch(err) {
        setError(withShortErrorMessage({error: err.message}))
      }
    }

    const login = async () => {
      try {
        await Auth.signIn(username, loginPassword);
        const user = await Auth.currentAuthenticatedUser();
        // same userInfo construct in gatsby-browser
/*         const userInfo = {
          ...user.attributes,
          username: user.username,
          usergroups: ( user.signInUserSession &&
            user.signInUserSession.accessToken &&
            user.signInUserSession.accessToken.payload) ?
            user.signInUserSession.accessToken.payload['cognito:groups'] : [],
        };
        setUser(userInfo); */
        userLoginSuccess()
        userStore.userLogIn(user)
        userStore.modalClose()
        if (!userStore.manualCancelModalClose) {
          userStore.setManualCancelModalClose(true)
        }
        if (userStore.newSignupComplete) {
          userStore.changeNewSignupComplete()
        }

      } catch (err) {
        console.error(err.message)
        setError(withShortErrorMessage({error: 'Login error. Please check your input and try again.'}))
      }
      userStore.setPasswordChanged(false)
    }

    const resetPasswordInit = async():Promise<void> => {
      try {
        await Auth.forgotPassword(username)
        userStore.setUserForResetPassword(username)
        resetAllValues()
        userStore.modalOpenAsResetPasswordComplete()
      } catch(err) {
        setError(withShortErrorMessage({error: err.message}))
      }
    }

    const resetPasswordComplete = async() => {
      try {
        await Auth.forgotPasswordSubmit(userStore.userForResetPassword, resetCode, newPassword);
        resetAllValues()
        userStore.setPasswordChanged(true)
        userStore.modalOpenAsLogin()
      } catch(err) {
        setError(withShortErrorMessage({error: err.message}))
      }
    }

    const renderModalContent = (loading: boolean): JSX.Element | null => {
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
      switch (userStore.signInOutModalStage) {
        case SignUpLoginModalShowType.SignUp: {
          return (<>
            <Form.Group widths='equal'>
              <Form.Input
                name='firstname'
                value={firstname}
                error={Boolean(error.firstname)}
                onChange={inputChangeHandler}
                required fluid label='First Name' placeholder='First Name' type='text'/>
              <Form.Input
                name='lastname'
                value={lastname}
                error={Boolean(error.lastname)}
                onChange={inputChangeHandler}
                required fluid label='Last Name' placeholder='Last Name' type='text'/>
            </Form.Group>
            <Form.Input
              name='email'
              value={email}
              error={Boolean(error.email)}
              onChange={inputChangeHandler}
              required label='Email' type='email' />
            <Form.Input
              name='password'
              error={Boolean(error.password)}
              value={password}
              onChange={inputChangeHandler}
              required label='Password' type='password' />
            <Form.Checkbox inline label='I agree to the terms and conditions'
              checked={acceptTerms} onChange={checkboxChangeHandler} name='acceptTerms'/>
            {
              !userStore.newSignupComplete && !userStore.passwordChanged &&
              (
                <Message warning>
                  <Icon name='help' />
                  Already signed up?&nbsp;
                  <a style={{ cursor: "pointer" }} onClick={switchToLoginModalShow}>Login</a>
                  &nbsp;instead.
                </Message>
              )
            }
          </>)
        }
        case SignUpLoginModalShowType.VerifyCode: {
          return (<>
            {(error === '' || JSON.stringify(error) == '{}') && (
              <Message warning>
                <p><Icon name='hand point right'/>
                Your username is <strong>{userStore.signUpUserName}</strong>. Please check your verification code.</p>
                <p><a style={{ cursor: "pointer" }} onClick={resendSignUp}>Resend verification code</a></p>
              </Message>
            )}
            <Form.Input
              name='authCode'
              value={authCode}
              error={Boolean(error.authCode)}
              onChange={inputChangeHandler}
              required label='Email verification code' type='text'/>
          </>)
        }
        case SignUpLoginModalShowType.Login: {
          return (<>
            {userStore.newSignupComplete &&
              (<Message warning>Account created successfully. Please login now.</Message>)
            }
            <Form.Input
              name='username'
              value={username}
              onChange={inputChangeHandler}
              required type='text'
              label='Email or Username'/>
            <Form.Input
              name='loginPassword'
              value={loginPassword}
              onChange={inputChangeHandler}
              required type='password'
              label={(
                <label>Password (<a style={{ cursor: "pointer" }} onClick={switchToForgotPassword}>Forgot password?</a>)</label>
              )}/>
              {
                !userStore.newSignupComplete && !userStore.passwordChanged &&
                (
                  <Message warning>
                    <Icon name='help' />
                      No account yet?&nbsp;
                      <a style={{ cursor: "pointer" }} onClick={switchToSignUpModalShow}>Join</a>
                      &nbsp;first.
                  </Message>
                )
              }
          </>)
        }
        case SignUpLoginModalShowType.ResetPasswordInit: {
          return (
            <Form.Input
            name='username'
            value={username}
            onChange={inputChangeHandler}
            required type='text'
            label='Email or Username'/>
          )
        }
        case SignUpLoginModalShowType.ResetPasswordComplete: {
          return (<>
            <Form.Input
              name='resetCode'
              value={resetCode}
              onChange={inputChangeHandler}
              required label='Confirmation code' type='text'/>
            <Divider horizontal section>
              <Icon name='key' />
            </Divider>
            <Form.Input
              name='newPassword'
              value={newPassword}
              onChange={inputChangeHandler}
              required label='New password' type='password' />
            <Form.Input
              name='confirmPassword'
              value={confirmPassword}
              onChange={inputChangeHandler}
              required label='Confirm password' type='password' />
          </>)
        }
        default: {
          return null
        }
      }
    }

    const operationResults = (loading: boolean):JSX.Element|null => {
      if (loading) {
        return null
      }
      switch(userStore.signInOutModalStage) {
        case SignUpLoginModalShowType.Login:
          return userStore.passwordChanged
            ? (<Message warning>
              <Icon name='info' />
              Password changed successfully.
            </Message>)
            : null
        case SignUpLoginModalShowType.ResetPasswordInit:
          return (<Message warning>
            <Icon name='info' />
            Confirmation code will be emailed.
          </Message>)
        default:
          return null
      }
    }
    const serializedErrors = errorsToString(error);
    return (
    <Modal
      as={Form}
      error={serializedErrors !== ''}
      warning
      open={userStore.signInOutModalShow}
      closeOnDimmerClick={userStore.manualCancelModalClose}
      onClose={closeModalHandler}
      size="small"
      style={{ maxWidth: 500 }}
      onSubmit={handleSubmit}>
        <Modal.Header>{userStore.modalHeaderText}</Modal.Header>
        <Modal.Content>
          {serializedErrors !== '' && (<Message error header='Error' content={serializedErrors} />)}
          {renderModalContent(loading)}
          {operationResults(loading)}
        </Modal.Content>
        <Modal.Actions>
        <Button type="submit" color="black" content="Submit" disabled={loading || serializedErrors !== ''}/>
        <Button onClick={closeModalHandler} color="grey" content="Cancel" disabled={loading}/>
      </Modal.Actions>
    </Modal>)
})
