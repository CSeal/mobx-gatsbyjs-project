/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IState, IAction, TReducer, IActionTypes, IActionHandlers } from '../form-input'

const actionTypes: IActionTypes = {
  InputFieldChangeValueSucces: 'InputFieldChangeValueSucces',
  InputFieldChangeValueFailure: 'InputFieldChangeValueFailure',
  InputFieldReset: 'InputFieldReset',
  DataLoading: 'DataLoading',
  ResetAllValues: 'ResetAllValues',
  InputAuthCodeSuccess: 'InputAuthCodeSuccess',
  UserLoginSuccess: 'UserLoginSuccess',
  SignUpSuccess: 'SignUpSucces',
  ResendSignUpSuccess: 'ResendSignUpSuccess',
  SetError: 'SetError',
  ResetError: 'ResetError',
  DataLoaded: 'DataLoaded',
}

export const formInitialState: IState = {
  username: '',
  password: '',
  loginPassword: '',
  firstname: '',
  lastname: '',
  email: '',
  authCode: '',
  loading: false,
  error: {},
  acceptTerms: false,
  confirmPassword: '',
  resetCode: '',
  newPassword: '',
}

export const reducer: TReducer = (state: IState, action: IAction) => {
  const { payload } = action
  switch (action.type) {
    case actionTypes.InputFieldChangeValueSucces: {
      const { error } = state
      if (payload === undefined || payload.fieldName === undefined) {
        return state
      }
      return {
        ...state,
        [payload.fieldName]: payload.fieldValue,
        error: {
          ...error,
          [payload.fieldName]: '',
        },
      }
    }
    case actionTypes.InputFieldChangeValueFailure: {
      const { error } = state
      if (payload === undefined || payload.fieldName === undefined) {
        return state
      }
      return {
        ...state,
        [payload.fieldName]: payload.fieldValue,
        error: {
          ...error,
          [payload.fieldName]: payload.error,
        },
      }
    }
    case actionTypes.InputFieldReset: {
      const { error } = state
      if (payload === undefined || payload.fieldName === undefined) {
        return state
      }
      return {
        ...state,
        [payload.fieldName]: '',
        error: {
          ...error,
          [payload.fieldName]: '',
        },
      }
    }
    case actionTypes.DataLoading: {
      return {
        ...state,
        error: {},
        loading: true,
      }
    }
    case actionTypes.ResetAllValues:
    case actionTypes.InputAuthCodeSuccess:
    case actionTypes.UserLoginSuccess:
    case actionTypes.ResendSignUpSuccess:
    case actionTypes.DataLoaded:
    case actionTypes.SignUpSuccess: {
      return {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        loginPassword: '',
        authCode: '',
        loading: false,
        error: {},
        acceptTerms: false,
        confirmPassword: '',
        resetCode: '',
        newPassword: '',
      }
    }
    case actionTypes.SetError: {
      const { error } = state
      return {
        ...state,
        error: {
          ...error,
          restErrors: payload && payload.error ? payload.error : '',
        },
        loading: false,
      }
    }
    case actionTypes.ResetError: {
      const { error } = state
      return {
        ...state,
        error: {
          ...error,
          restErrors: '',
        },
      }
    }
    default:
      return state
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorsToString = (errors: any): string => {
  if (!errors) return ''
  return Object.keys(errors).reduce((acc, errorKey) => {
    if (errors[errorKey] !== undefined && errors[errorKey] !== '') {
      // eslint-disable-next-line no-param-reassign
      acc += `${errors[errorKey]} \n\r`
    }
    return acc
  }, '')
}

export const actionHandlers: IActionHandlers = {
  inputChangeHandler: {
    actionSuccess: payload => ({
      type: actionTypes.InputFieldChangeValueSucces,
      payload: {
        fieldName: payload.name,
        fieldValue: payload.value,
      },
    }),
    actionFailure: payload => ({
      type: actionTypes.InputFieldChangeValueFailure,
      payload: {
        fieldName: payload.name,
        fieldValue: payload.value,
        error: payload.errorMsg,
      },
    }),
    validationRules: [
      {
        usingFields: ['password', 'newPassword'],
        ruleFunc: data => ({
          isValid: data.value.length > 6,
          errorMsg: '{usingField} is too short',
        }),
      },
      {
        usingFields: ['confirmPassword'],
        ruleFunc: (data, state) => ({
          isValid: data.value === state.newPassword,
          errorMsg: '{usingField} does not match',
        }),
      },
    ],
    middlewares: [
      {
        usingFields: ['email', 'username'],
        func: data => {
          const newData = { ...data }
          if (newData.value === '') {
            return newData
          }
          newData.value = newData.value.toLowerCase()
          return newData
        },
      },
    ],
    eventHandler: (_event, data) => data,
  },
  checkboxChangeHandler: {
    actionSuccess: payload => ({
      type: actionTypes.InputFieldChangeValueSucces,
      payload: {
        fieldName: payload.name,
        fieldValue: payload.checked,
        error: '',
      },
    }),
    eventHandler: (_event, data) => data,
  },
  inputFieldValueReset: {
    action: payload => ({
      type: actionTypes.InputFieldReset,
      payload: {
        fieldName: payload.fieldName,
      },
    }),
  },
  dataLoading: {
    action: _payload => ({
      type: actionTypes.DataLoading,
    }),
  },
  dataLoaded: {
    action: _payload => ({
      type: actionTypes.DataLoaded,
    }),
  },
  resetAllValues: {
    action: _payload => ({
      type: actionTypes.ResetAllValues,
    }),
  },
  signUpSuccess: {
    action: _payload => ({
      type: actionTypes.SignUpSuccess,
    }),
  },
  inputAuthCodeSuccess: {
    action: _payload => ({
      type: actionTypes.InputAuthCodeSuccess,
    }),
  },
  userLoginSuccess: {
    action: _payload => ({
      type: actionTypes.UserLoginSuccess,
    }),
  },
  resendSignUpSuccess: {
    action: _payload => ({
      type: actionTypes.ResendSignUpSuccess,
    }),
  },
  setError: {
    action: payload => ({
      type: actionTypes.SetError,
      payload,
    }),
  },
}
