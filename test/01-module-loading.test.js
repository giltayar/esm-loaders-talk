import {before, describe, it} from 'node:test'
import util from 'node:util'
import assert from 'node:assert/strict'
import {runInNodeLoader} from './run-in-node.js'

util.inspect.defaultOptions.colors = false

describe('01-module-loading', (c) => {
  before(() => process.chdir(c.name))

  it('should load modules', async () => {
    assert.deepEqual(await runInNodeLoader('main.js'), [
      'executing "module.js"',
      'executing "main.js"',
    ])
  })

  it('should load modules with submodules and named exports', async () => {
    assert.deepEqual(await runInNodeLoader('main2.js'), [
      'executing "module.js"',
      'executing "main2.js" 1 2 abc...',
    ])
  })
})
