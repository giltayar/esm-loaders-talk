import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

const hasOffThreadWorkers = !process.version.startsWith('v18.')

describe('07-clear-cache/off-thread', {skip: !hasOffThreadWorkers}, (c) => {
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
