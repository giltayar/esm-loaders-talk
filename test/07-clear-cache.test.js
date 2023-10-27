import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNodeLoader, runInNodeImport} from './run-in-node.js'

describe('07-clear-cache', {skip: runInNodeImport.supports}, (c) => {
  before(() => process.chdir(c.name))

  it('should clear the cache when the loader runs', async () => {
    assert.deepEqual(await runInNodeLoader('main.js', 'loader.js'), [
      'module "module.js" loaded',
      'module "module.js" loaded',
    ])
  })

  it('should *not* clear the cache when the loader does not runs', async () => {
    assert.deepEqual(await runInNodeLoader('main.js'), [
      'module "module.js" loaded',
    ])
  })
})
