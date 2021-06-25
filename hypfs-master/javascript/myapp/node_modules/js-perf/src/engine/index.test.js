import test from 'ava'
import { getStartLabel } from './index'

test('getStartLabel returns the expected string ', t => {
  const label = 'dummy'
  t.true(getStartLabel(label) === 'dummy_START')
})
