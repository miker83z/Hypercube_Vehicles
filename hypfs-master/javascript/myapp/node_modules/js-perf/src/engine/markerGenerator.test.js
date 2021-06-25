import test from 'ava'
import { giveMeAllMeasures } from './markerGenerator'

test('giveMeAllMeasures return all my measures', t => {
  const measures = giveMeAllMeasures()
  const expectedMeasures = []
  t.deepEqual(measures, expectedMeasures)
})
