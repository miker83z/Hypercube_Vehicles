import test from 'ava'
import { checkSupport } from './index'

test('checkSupport returns a string', t => {
  const result = checkSupport()

  t.true(typeof result === 'string')
})
