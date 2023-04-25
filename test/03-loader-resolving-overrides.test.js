import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

describe('03-loader-resolving-overrides', ([c]) => {
  before(() => process.chdir(c.name))

  it('should override modules', async () => {
    assert.deepEqual(await runInNode('main.js', 'loader.js'), [
      'module overridden!',
    ])
  })

  it('should not override if no loader', async () => {
    await assert.rejects(
      () => runInNode('main.js'),
      /ERR_MODULE_NOT_FOUND.*a-module-to-override/
    )
  })
})
