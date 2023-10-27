import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNodeLoader, runInNodeImport} from './run-in-node.js'

describe('05-loader-transforming-ts', (c) => {
  before(() => process.chdir(c.name))

  it('should load modules and transpile TypeScript', async () => {
    assert.deepEqual(await runInNodeLoader('main.ts', 'loader.js'), ['42'])
    runInNodeImport.supports &&
      assert.deepEqual(await runInNodeImport('main.ts', 'loader.js'), ['42'])
  })

  it('should not load transform ts if no loader', async () => {
    await assert.rejects(
      () => runInNodeLoader('main.ts'),
      /ERR_UNKNOWN_FILE_EXTENSION/,
    )
    runInNodeImport.supports &&
      (await assert.rejects(
        () => runInNodeImport('main.ts'),
        /ERR_UNKNOWN_FILE_EXTENSION/,
      ))
  })
})
