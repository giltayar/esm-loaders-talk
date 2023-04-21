import {it, before, after, describe} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'
import {execa} from 'execa'
import retry from 'p-retry'

describe('06-loader-chaining', ([c]) => {
  before(() => process.chdir(c.name))

  const killServeProcess = new AbortController()
  before(async () => {
    execa('../node_modules/.bin/serve', ['-l', '3000', '.'], {
      signal: killServeProcess.signal,
    })

    await retry(() => fetch('http://localhost:3000'))
  })

  after(async () => {
    killServeProcess.abort()

    await retry(
      () =>
        fetch('http://localhost:3000')
          .catch((_) => 1)
          .then((_) => Promise.reject(new Error())),
      {minTimeout: 200, maxTimeout: 200}
    ).catch(() => 1)
  })

  it('should chain modules together', async () => {
    assert.deepEqual(
      await runInNode(
        'main.js',
        '../05-loader-reading-http/loader.js',
        '../04-loader-transforming-ts/loader.js',
        '../03-loader-resolving-overrides/loader.js'
      ),
      ['4 2']
    )
  })

  it('should fail loading if overrides loader is first', async () => {
    await assert.rejects(
      () =>
        runInNode(
          'main.js',
          '../03-loader-resolving-overrides/loader.js',
          '../05-loader-reading-http/loader.js',
          '../04-loader-transforming-ts/loader.js'
        ),
      /ERR_UNSUPPORTED_ESM_URL_SCHEME.*http/
    )
  })

  it('should fail loading if ts loader is before http', async () => {
    await assert.rejects(
      () =>
        runInNode(
          'main.js',
          '../04-loader-transforming-ts/loader.js',
          '../05-loader-reading-http/loader.js',
          '../03-loader-resolving-overrides/loader.js'
        ),
      /SyntaxError.*Missing initializer/
    )
  })
})
