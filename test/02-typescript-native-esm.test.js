import {it, before, describe} from 'node:test'
import assert from 'node:assert/strict'
import {runInNodeLoader} from './run-in-node.js'

describe('02-typescript-native-esm', (c) => {
  before(() => process.chdir(c.name))

  it('should export ts files as native esm', async () => {
    assert.deepEqual(await runInNodeLoader('main2.js'), [
      'executing "module.js"',
      'executing "main2.js" 1 2 abc...',
    ])
  })
})
