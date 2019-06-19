'use strict'

const treat = (str, { replace = '' } = {}) => str.split(' ').join(replace)

module.exports = ({
  app_id,
  redirect_uri,
  display = 'page',
  href,
  hashtags,
  quote,
  mobile_iframe = false
}) => {
  if (!app_id) {
    return new TypeError('`app_id` is required')
  }

  const baseUrl = 'https://www.facebook.com/dialog/share'
  const appId = `app_id=${app_id}`
  const hasRedirectUri = redirect_uri
    ? `redirect_uri=${redirect_uri}`
    : undefined
  const hasDisplay = display ? `display=${display}` : undefined
  const hasHref = href ? `href=${href}` : undefined
  const hasHashtags = hashtags ? `hashtag=${treat(hashtags)}` : undefined
  const hasQuote = quote
    ? `quote=${treat(quote, { replace: '%20' })}`
    : undefined
  const hasMobileIframe = mobile_iframe
    ? `mobile_iframe=${mobile_iframe}`
    : undefined
  const arr = [
    appId,
    hasRedirectUri,
    hasDisplay,
    hasHref,
    hasQuote,
    hasHashtags,
    hasMobileIframe
  ]
  const filtering = arr.filter(Boolean)
  const queries = filtering.join('&')

  return `${baseUrl}?${queries}`
}
