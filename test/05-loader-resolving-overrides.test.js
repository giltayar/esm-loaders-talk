import {it} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

process.chdir('05-loader-resolving-overrides')

it('should override modules', async () => {
  assert.deepEqual(await runInNode('main.js', 'loader.js'), [
    'module overriden!',
  ])
})
