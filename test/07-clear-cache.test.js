import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

describe('07-clear-cache', ([c]) => {
  before(() => process.chdir(c.name))

  it('should clear the cache when the loader runs', async () => {
    assert.deepEqual(await runInNode('main.js', 'loader.js'), [
      'module "module.js" loaded',
      'module "module.js" loaded',
    ])
  })

  it('should *not* clear the cache when the loader does not runs', async () => {
    assert.deepEqual(await runInNode('main.js'), ['module "module.js" loaded'])
  })
})
