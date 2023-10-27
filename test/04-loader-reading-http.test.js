import {it, describe, before} from 'node:test'
import assert from 'node:assert/strict'
import {runInNodeLoader, runInNodeImport} from './run-in-node.js'

describe('04-loader-reading-http', (c) => {
  before(() => process.chdir(c.name))

  it('should load modules via http', async () => {
    assert.deepEqual(await runInNodeLoader('main.js', 'loader.js'), ['abc...'])

    runInNodeImport.support &&
      assert.deepEqual(await runInNodeImport('main.js', 'loader.js'), [
        'abc...',
      ])
  })

  it('should not load modules via http if no loader', async () => {
    await assert.rejects(
      () => runInNodeLoader('main.js'),
      /ERR_UNSUPPORTED_ESM_URL_SCHEME/,
    )
    runInNodeImport.support &&
      (await assert.rejects(
        () => runInNodeImport('main.js'),
        /ERR_UNSUPPORTED_ESM_URL_SCHEME/,
      ))
  })
})
