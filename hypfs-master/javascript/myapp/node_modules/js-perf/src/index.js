import { recordingStart, recordingStop, getMeasures, start, stop } from './engine'
import { support } from './utilities'

/**
 * It starts the trace the marks
 */
export function startRecording () {
  recordingStart()
}

/**
 * It stops tracing the marks
 */
export function stopRecording () {
  recordingStop()
}

/**
 * It prints in a table all the measures
 */
export function allMeasures () {
  getMeasures()
}

/**
 * It creates a marker
 * @param  {String} labelToMarkWith The name of the marker
 * @return {String}                 Dev only, in return the marked label
 */
export function startMark (labelToMarkWith) {
  start(labelToMarkWith)
  if (process.env.NODE_ENV !== 'production') {
    return labelToMarkWith
  }
}

/**
 * It creates a marker the ending operation
 * @param  {String} labelToMarkWith The name of the marker
 * @return {String}                 Dev only, in return the marked label
 */
export function endMark (labelToMarkWith) {
  stop(labelToMarkWith)
  if (process.env.NODE_ENV !== 'production') {
    return labelToMarkWith
  }
}

/**
 * Gives information is it is possible to use the library
 * @return {String?} Reason why the browser doest not support the API
 */
export function checkSupport () {
  return support()
}
