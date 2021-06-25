import { START, STOP } from '../utilities/constants'
import Marker from './marker'

let labels = {}

if (process.env.NODE_ENV !== 'production') {
  // performance =  internalPerformance
}

export function internalStart (label) {
  const startLabel = `${label}-${START}`
  labels[label] = {
    start: startLabel
  }
  performance.mark(startLabel)
}

export function internalEnd (label) {
  const stopLabel = `${label}-${STOP}`
  labels[label]['stop'] = stopLabel
  performance.mark(stopLabel)
}

export function giveMeAllMarkers () {
  for (const label in labels) {
    const originalLabel = labels[label]
    const startLabel = originalLabel.start
    const stopLabel = originalLabel.stop
    try {
      performance.measure(label, startLabel, stopLabel)
    } catch (e) {
      throw new Error('JS Performance is trying access to marker that does not exist')
    }
  }
  const measures = performance.getEntriesByType('measure')

  const markers = []
  for (let measure of measures) {
    markers.push(new Marker({
      name: measure.name,
      duration: measure.duration
    }))
  }
  return markers
}

export function clearMarkers () {
  labels = {}
  performance.clearMarks()
  performance.clearMeasures()
}
