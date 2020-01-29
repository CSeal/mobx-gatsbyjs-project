/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useState } from 'react'

export type IFormInput = React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setValue,
    reset: (valueIn: string = '') => setValue(valueIn),
    bind: {
      value,
      onChange: (event: IFormInput) => {
        setValue(event.currentTarget.value)
      },
    },
    bindForDropDown: {
      value,
      onChange: (event: IFormInput, dataIn: any) => {
        event.stopPropagation()
        const valueIn = dataIn ? dataIn.value : ''
        setValue(valueIn)
      },
    },
  }
}

export interface IActionTypes {
  [key: string]: string
}
export interface IState {
  [key: string]: any
}
export interface IAction {
  type: string
  payload?: any
}

export interface IActionHandlers {
  [handlerName: string]: IHandler | IHandlerWithValidation | IPlainAction
}

interface IHandler {
  actionSuccess: TActionCreater
  eventHandler: TEventHandler
  middlewares?: IMiddlewares[]
}
interface IHandlerWithValidation extends IHandler {
  actionFailure: TActionCreater
  validationRules: IValidationRules[]
}

interface IValidationRules {
  usingFields?: string[]
  ruleFunc: TRuleFunc
}

interface IMiddlewares {
  usingFields?: string[]
  func: TMiddlewareFunc
}
type TMiddlewareFunc = (data: any) => any
type TRuleFunc = (data: any, state: IState) => IRuleFuncResult

interface IRuleFuncResult {
  isValid: boolean
  errorMsg: string
}
interface IPlainAction {
  action: TActionCreater
}

type TEventHandler = (event: React.SyntheticEvent, data?: any) => any
type TActionCreater = (payload: any) => IAction

export type TReducer = (state: IState, action: IAction) => IState

type THandler = IHandler | IHandlerWithValidation | IPlainAction

const validationProcessor = (rules: IValidationRules[], data: any, state: IState): IRuleFuncResult => {
  const validationResult: IRuleFuncResult = {
    isValid: true,
    errorMsg: '',
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rules.length; i++) {
    const currentRule: IValidationRules = rules[i]
    if (
      currentRule.usingFields === undefined ||
      (Array.isArray(currentRule.usingFields) && currentRule.usingFields.includes(data.name))
    ) {
      const currentResult: IRuleFuncResult = currentRule.ruleFunc(data, state)
      validationResult.isValid = Boolean(currentResult.isValid)
      const fieldName: string = data.name.replace(/([a-z])([A-Z])/g, function(
        _match: string,
        lowerCaseLetter: string,
        capitalLetter: string
      ) {
        return `${lowerCaseLetter} ${capitalLetter.toLowerCase()}`
      })
      validationResult.errorMsg =
        typeof currentResult.errorMsg === 'string'
          ? currentResult.errorMsg.replace(/{.*}/i, fieldName)
          : 'Unknown error'
      if (!validationResult.isValid) {
        break
      }
    }
  }
  return validationResult
}

const applyMiddleware = (middlewares: IMiddlewares[], data: any): any => {
  const copyMiddlewares = [...middlewares]
  const middleware = copyMiddlewares.shift()
  const newData: any =
    middleware &&
    middleware.usingFields &&
    (!middleware.usingFields.length || middleware.usingFields.includes(data.name))
      ? middleware.func(data)
      : data
  return middlewares.length ? applyMiddleware(copyMiddlewares, newData) : newData
}

export const useNewInput = (initialState: IState, reducer: TReducer, eventHandlers: IActionHandlers) => {
  const shortMessageShowTimeDelayMS = 3000 //10000
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const enchacedActionHandlers: any = Object.keys(eventHandlers).reduce((acc: any, handlerName: string): any => {
    const handlerConfig: any | THandler = eventHandlers[handlerName]
    acc[handlerName] =
      handlerConfig.eventHandler !== undefined
        ? (...arg: any[]) => {
            const eventData: any =
              handlerConfig.middlewares && handlerConfig.middlewares.length
                ? applyMiddleware(handlerConfig.middlewares, handlerConfig.eventHandler(...arg))
                : handlerConfig.eventHandler(...arg)
            const validationResult: IRuleFuncResult =
              handlerConfig.validationRules && handlerConfig.validationRules.length
                ? validationProcessor(handlerConfig.validationRules, eventData, state)
                : { isValid: true, errorMsg: '' }
            dispatch(
              validationResult.isValid
                ? handlerConfig.actionSuccess(eventData)
                : handlerConfig.actionFailure({ ...eventData, ...validationResult })
            )
          }
        : (...arg: any[]) => dispatch(handlerConfig.action(arg[0]))
    acc[handlerName] = React.useCallback(acc[handlerName], [state])
    return acc
  }, {})
  const withShortErrorMessage = React.useCallback((action: IAction) => {
    setTimeout(function() {
      dispatch({
        type: 'ResetError',
      })
    }, shortMessageShowTimeDelayMS)
    return action
  }, [])
  return {
    values: state,
    withShortErrorMessage,
    ...enchacedActionHandlers,
  }
}
