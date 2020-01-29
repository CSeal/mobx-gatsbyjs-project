/* eslint-disable global-require */
import imageNotInCatalog from '../images/ImageNotInCatalog.png'

export const productCardImgUrlCreater = (productImageCode: string, size?: 'large' | 'small'): string => {
  // "image not in catalog" ASI fallback if unrecognized image code
  const imageCode = productImageCode.split('/')[0] === 'media' ? productImageCode : 'media/0'
  return `https://api.asicentral.com/v1/${imageCode}${size ? `?size=${size}` : ''}`
}

export const quoteCardImgUrlCreater = (quoteItemImageCode: string, size?: 'large' | 'small'): string => {
  if (quoteItemImageCode.split('/')[0] === 'public') {
    // S3 storage image
    const awsmobile = require('../aws-exports.js').default
    return `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/${quoteItemImageCode}`
  }
  return productCardImgUrlCreater(quoteItemImageCode, size)
}

export const sliderImgUrlCreater = (sliderImageCode: string): string => {
  const awsmobile = require('../aws-exports.js').default
  return `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/${sliderImageCode}`
}

export const onGetImageError = (event: React.SyntheticEvent) => {
  event.preventDefault()
  // https://stackoverflow.com/a/49515812/4669368
  const element = event.currentTarget as HTMLImageElement
  element.src = imageNotInCatalog
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const locationPathCreater = (locationObject: any): string =>
  locationObject.uri + (locationObject['*'] ? `/${locationObject['*']}` : '')

// https://stackoverflow.com/a/1054862/4669368
export const titleSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
