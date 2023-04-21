import {it} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'

process.chdir('02-typescript-native-esm')

it('should export ts files as native esm', async () => {
  assert.deepEqual(await runInNode('main2.js'), [
    'executing "module.js"',
    'executing "main2.js" 1 2 abc...',
  ])
})
