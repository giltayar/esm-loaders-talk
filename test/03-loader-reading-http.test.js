import {it} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

process.chdir('03-loader-reading-http')

it('should load modules via http', async () => {
  assert.deepEqual(await runInNode('main.js', 'loader.js'), [
    'abc...',
  ])
})
