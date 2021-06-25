import { log } from './logger'

export function allowed () {
  return typeof window !== 'undefined'
}

export function precise () {
  return typeof window.performance !== 'undefined'
}

/**
 * It checks if the browser supports marks
 * @return {String} Simple string with information about supporting
 */
export function support () {
  let result = ''
  if (allowed()) {
    if (precise()) {
      result = 'Your browser support the User Timing API. The measures will be precise!'
    } else {
      result = 'Your browser does not support the User Timing API. The measures will not be precise'
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    return result
  } else {
    log(result)
  }
}
