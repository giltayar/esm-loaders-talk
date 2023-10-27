import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNodeImport, runInNodeLoader} from './run-in-node.js'

describe('03-loader-resolving-overrides', (c) => {
  before(() => process.chdir(c.name))

  it('should override modules', async () => {
    assert.deepEqual(await runInNodeLoader('main.js', 'loader.js'), [
      'module overridden!',
    ])
    runInNodeImport.supports &&
      assert.deepEqual(await runInNodeImport('main.js', 'loader.js'), [
        'module overridden!',
      ])
  })

  it('should not override if no loader', async () => {
    await assert.rejects(
      () => runInNodeLoader('main.js'),
      /ERR_MODULE_NOT_FOUND.*a-module-to-override/,
    )
    runInNodeImport.supports &&
      (await assert.rejects(
        () => runInNodeImport('main.js'),
        /ERR_MODULE_NOT_FOUND.*a-module-to-override/,
      ))
  })
})
