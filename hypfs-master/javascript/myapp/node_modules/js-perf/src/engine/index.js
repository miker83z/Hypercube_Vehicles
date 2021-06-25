import { internalStart, internalEnd, giveMeAllMarkers, clearMarkers } from './markerGenerator'

export let start = () => {}
export let stop = () => {}

export function recordingStart () {
  clearMarkers()
  start = internalStart
  stop = internalEnd
}

export function recordingStop () {
  start = () => {}
  stop = () => {}
}

export function getMeasures () {
  const markers = giveMeAllMarkers()
  const table = markers.map(marker => ({ 'Operation name': marker.name, 'Duration (ms)': marker.duration }))
  console.table(table)
}

export function getMeasure (label) {
  performance.getEntriesByName('', 'mark')
}
