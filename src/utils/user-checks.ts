import { getUser } from './auth'
import { GetQuoteBoardQuery, GetShopQuery } from '../API'

// authenticated user's email
export const getUserEmail = (currentUserEmailFromGS?: string) => {
  const currentUserEmail = currentUserEmailFromGS || getUser().email
  return currentUserEmail || ''
}

// QuoteBoard user check for being owner or among members
export const isDeckUser = (qdeck: GetQuoteBoardQuery['getQuoteBoard'], currentUserFromGS?: string) => {
  const currentUser = currentUserFromGS || getUser().username
  if (currentUser) {
    if (qdeck && qdeck.owner && qdeck.owner === currentUser) {
      return true
    }
    if (qdeck && qdeck.members && qdeck.members.includes(currentUser)) {
      return true
    }
  }
  return false
}

// Shop user check for being owner or among admins/members
export const isShopUser = (shop: GetShopQuery['getShop'], currentUserFromGS?: string) => {
  const currentUser = currentUserFromGS || getUser().username
  if (currentUser) {
    if (shop) {
      if (shop.owner && shop.owner === currentUser) {
        return true
      }
      if (shop.shopadmins && shop.shopadmins.includes(currentUser)) {
        return true
      }
      if (shop.members && shop.members.includes(currentUser)) {
        return true
      }
    }
  }
  return false
}

// Shop user check for being owner or among admins
export const isShopAdmin = (shop: GetShopQuery['getShop'], currentUserFromGS?: string) => {
  const currentUser = currentUserFromGS || getUser().username
  if (currentUser) {
    if (shop) {
      if (shop.owner && shop.owner === currentUser) {
        return true
      }
      if (shop.shopadmins && shop.shopadmins.includes(currentUser)) {
        return true
      }
    }
  }
  return false
}

// check for authenticated user's email being present in array
export const isEmailInvited = (emailArray: Array<string | null>, currentUserEmailFromGS?: string) => {
  const email = currentUserEmailFromGS ? getUserEmail(currentUserEmailFromGS) : getUserEmail()
  if (email && email !== '' && emailArray.includes(email)) {
    return true
  }
  return false
}

// remove non-alpha characters and make first letter uppercase
// returns empty string if non-alpha without raising error
const capitalizeFirstLetterAlpha = (strinp: string) => {
  const stralpha = strinp.replace(/[^a-z]/gi, '')
  return stralpha.charAt(0).toUpperCase() + stralpha.slice(1)
}

// first and last name papitalized from username "first_last{num}"
export const userNameFirstLast = (uname: string) => {
  const [fname, lname] = uname.split('_')
  return `${capitalizeFirstLetterAlpha(fname)} ${capitalizeFirstLetterAlpha(lname)}`
}
