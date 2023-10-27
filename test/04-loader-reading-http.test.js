import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

describe('04-loader-reading-http', (c) => {
  before(() => process.chdir(c.name))

  it('should load modules via http', async () => {
    assert.deepEqual(await runInNode('main.js', 'loader.js'), ['abc...'])
  })

  it('should not load modules via http if no loader', async () => {
    await assert.rejects(
      () => runInNode('main.js'),
      /ERR_UNSUPPORTED_ESM_URL_SCHEME/,
    )
  })
})
