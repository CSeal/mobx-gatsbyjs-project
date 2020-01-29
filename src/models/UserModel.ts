/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { observable, action, decorate, computed } from 'mobx'
import Auth from '@aws-amplify/auth'
//import { navigate } from '@reach/router'
import { SignUpLoginModalShowType, UserSettingsOperationType } from '../types'
import { setUser, getUser } from '../utils/auth'

interface ILoginedUser {
  email?: string
  email_verified?: boolean
  sub?: string
  username?: string
  usergroups?: string[]
}

type TCallbackAfterLogin = () => any
class UserModel {
  signUpUserName = ''

  preLoading: boolean = false

  loginedUser: ILoginedUser = getUser()

  signInOutModalShow: boolean = false

  signInOutModalStage: number | null = null

  signInOutModalPreviousStage: number | null = null

  newSignupComplete: boolean = false

  forwardAfterCancel: string | null = null

  manualCancelModalClose: boolean = true

  userForResetPassword: string | null = null

  passwordChanged: boolean = false

  rootStore: any

  callbackForLoginModal: TCallbackAfterLogin | null = null

  userSettingsOperationType: number = UserSettingsOperationType.default

  emailChangeCodeSent: boolean = false

  passwordWasChanged: boolean = false

  constructor(rootStore: any) {
    this.rootStore = rootStore
  }

  get isLoggedIn() {
    if (!this.loginedUser) return false
    return !!this.loginedUser.username
  }

  get isAdmin() {
    if (!this.loginedUser) return false
    return Array.isArray(this.loginedUser.usergroups) && this.loginedUser.usergroups.includes('admin')
  }

  get isUserEmailVerified() {
    if (!this.loginedUser) return false
    return !!this.loginedUser.email_verified
  }

  get modalHeaderText() {
    switch (this.signInOutModalStage) {
      case SignUpLoginModalShowType.Login:
        return 'Login'
      case SignUpLoginModalShowType.SignUp:
        return 'New account'
      case SignUpLoginModalShowType.VerifyCode:
        return 'Confirm account'
      case SignUpLoginModalShowType.ResetPasswordInit:
        return 'Reset password'
      case SignUpLoginModalShowType.ResetPasswordComplete:
        return 'Confirm password'
      default:
        return ''
    }
  }

  get getUserEmail() {
    if (!this.loginedUser) return ''
    return this.loginedUser.email || ''
  }

  setEmailChangeCodeSent = (status: boolean = false): void => {
    this.emailChangeCodeSent = status
  }

  setPasswordWasChanged = (status: boolean = false): void => {
    this.passwordWasChanged = status
  }

  setUserSettingsOperationType(type: number): void {
    if (type !== UserSettingsOperationType.activateEmail) {
      this.setEmailChangeCodeSent()
    }
    if (this.passwordWasChanged && type !== UserSettingsOperationType.default) {
      this.setPasswordWasChanged()
    }
    this.userSettingsOperationType = type
  }

  setSignUpUserName = (userName: string) => {
    this.signUpUserName = userName
  }

  setLoginUser = (user: ILoginedUser) => {
    setUser(user)
    this.loginedUser = user
  }

  setUserForResetPassword = (user: string | null) => {
    this.userForResetPassword = user
  }

  clearUserForResetPassword = () => this.setUserForResetPassword(null)

  setManualCancelModalClose = (state: boolean) => {
    this.manualCancelModalClose = state
  }

  changeNewSignupComplete = () => {
    this.newSignupComplete = !this.newSignupComplete
  }

  setRouteToForwardAfterCancel = (route: string | null) => {
    this.forwardAfterCancel = route
  }

  setUserAttribute = async (attrObject: any): Promise<void> => {
    const cognitoUser = await this.refreshAWSUser(true)
    await Auth.updateUserAttributes(cognitoUser, attrObject)
    await this.refreshAWSUser(true)
  }

  confirmUserAttribute = async (attrName: string, verifyCode: string): Promise<void> => {
    await Auth.verifyCurrentUserAttributeSubmit(attrName, verifyCode)
    await this.refreshAWSUser(true)
  }

  changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
    const cognitoUser = await this.refreshAWSUser(true)
    await Auth.changePassword(cognitoUser, oldPassword, newPassword)
  }

  refreshAWSUser = async (bypassCache: boolean = false) => {
    try {
      const userFromAWS = await Auth.currentAuthenticatedUser({ bypassCache })
      this.userLogIn(userFromAWS)
      return userFromAWS
    } catch (err) {
      this.setLoginUser({})
      throw err
    }
  }

  userLogIn = (userFromAWS: any) => {
    const user = {
      ...userFromAWS.attributes,
      username: userFromAWS.username,
    }
    try {
      user.usergroups = userFromAWS.signInUserSession.accessToken.payload['cognito:groups']
    } catch (err) {
      user.usergroups = []
    } finally {
      this.setLoginUser(user)
      this.rootStore.deckStore.loadDecksRouter()
      this.rootStore.favoriteProductsStore.loadFavoriteProductIdsFromAWS()
    }
  }

  userLogOut = () => {
    //navigate('/')
    this.setLoginUser({})
    this.setUserSettingsOperationType(UserSettingsOperationType.default)
    this.setEmailChangeCodeSent()
    this.setPasswordWasChanged()
    this.rootStore.favoriteProductsStore.clearFavoriteProductIds()
    if (typeof this.rootStore.deckStore.unSubscribeDecksUpdate === 'function') {
      this.rootStore.deckStore.unSubscribeDecksUpdate()
    }
    window.location.reload()
  }

  setPreviousStage = (stage: number | null) => {
    this.signInOutModalPreviousStage = stage
  }

  modalOpenAsLogin = () => {
    this.setPreviousStage(this.signInOutModalStage)
    if (this.passwordChanged && this.signInOutModalPreviousStage !== SignUpLoginModalShowType.ResetPasswordComplete) {
      this.setPasswordChanged(false)
    }
    this.signInOutModalStage = SignUpLoginModalShowType.Login
    this.signInOutModalShow = true
  }

  modalOpenAsLoginWithCallback = (cb: any): void => {
    this.callbackForLoginModal = cb
    this.modalOpenAsLogin()
  }

  modalOpenAsVerifyCode = () => {
    this.setPreviousStage(this.signInOutModalStage)
    if (this.signUpUserName === '') {
      this.modalOpenAsSignUp()
      return
    }
    this.signInOutModalStage = SignUpLoginModalShowType.VerifyCode
    this.signInOutModalShow = true
  }

  modalOpenAsSignUp = () => {
    this.setPreviousStage(this.signInOutModalStage)
    if (this.signUpUserName !== '') {
      this.modalOpenAsVerifyCode()
      return
    }
    this.signInOutModalStage = SignUpLoginModalShowType.SignUp
    this.signInOutModalShow = true
  }

  modalOpenAsResetPasswordInit = () => {
    this.setPreviousStage(this.signInOutModalStage)
    this.setPasswordChanged(false)
    this.signInOutModalStage = SignUpLoginModalShowType.ResetPasswordInit
    this.signInOutModalShow = true
  }

  modalOpenAsResetPasswordComplete = () => {
    this.setPreviousStage(this.signInOutModalStage)
    if (!this.userForResetPassword) {
      this.modalOpenAsResetPasswordInit()
      return
    }
    this.signInOutModalStage = SignUpLoginModalShowType.ResetPasswordComplete
    this.signInOutModalShow = true
  }

  setPasswordChanged = (state: boolean) => {
    this.passwordChanged = state
  }

  modalClose = () => {
    if (
      this.callbackForLoginModal !== null &&
      this.signInOutModalStage === SignUpLoginModalShowType.Login &&
      this.isLoggedIn
    ) {
      this.callbackForLoginModal()
    }
    this.callbackForLoginModal = null
    this.signInOutModalStage = null
    this.signInOutModalShow = false
  }
}

decorate(UserModel, {
  preLoading: observable,
  loginedUser: observable,
  signUpUserName: observable,
  manualCancelModalClose: observable,
  signInOutModalStage: observable,
  signInOutModalShow: observable,
  userForResetPassword: observable,
  userSettingsOperationType: observable,
  emailChangeCodeSent: observable,
  passwordWasChanged: observable,
  modalHeaderText: computed,
  isLoggedIn: computed,
  isAdmin: computed,
  getUserEmail: computed,
  isUserEmailVerified: computed,
  setUserSettingsOperationType: action,
  modalOpenAsVerifyCode: action,
  modalOpenAsLogin: action,
  modalOpenAsSignUp: action,
  modalOpenAsResetPasswordInit: action,
  modalOpenAsResetPasswordComplete: action,
  setSignUpUserName: action,
  changeNewSignupComplete: action,
  setLoginUser: action,
  setManualCancelModalClose: action,
  setRouteToForwardAfterCancel: action,
  setUserForResetPassword: action,
  clearUserForResetPassword: action,
  setEmailChangeCodeSent: action,
  setPasswordWasChanged: action,
})

export default UserModel
