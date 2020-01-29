// https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/src/utils/auth.js
// https://www.gatsbyjs.org/tutorial/authentication-tutorial/
const isBrowser = typeof window !== `undefined`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUser = (user: any) => {
  window.localStorage.gatsbyUser = JSON.stringify(user)
}

export const getUser = () => {
  try {
    const user = JSON.parse(window.localStorage.gatsbyUser)
    return user
  } catch (err) {
    return {}
  }
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()
  if (user) return !!user.username
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = (callback: Function) => {
  console.log('qqqq')
  if (!isBrowser) return
  setUser({})
  callback()
}
