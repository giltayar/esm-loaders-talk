import {it, before, after, describe} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'
import {execa} from 'execa'
import retry from 'p-retry'

describe('06-loader-chaining', (c) => {
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
      {minTimeout: 200, maxTimeout: 200},
    ).catch(() => 1)
  })

  describe('two loaders', () => {
    it('should chain 2 modules together', async () => {
      assert.deepEqual(
        await runInNode(
          'main.js',
          '../04-loader-reading-http/loader.js',
          '../05-loader-transforming-ts/loader.js',
        ),
        ['42'],
      )
    })

    it('should fail loading if ts loader is before http', async () => {
      await assert.rejects(
        () =>
          runInNode(
            'main.js',
            '../05-loader-transforming-ts/loader.js',
            '../04-loader-reading-http/loader.js',
          ),
        /SyntaxError.*Missing initializer/,
      )
    })
  })

  describe('three loaders', () => {
    it('should chain 3 modules together', async () => {
      assert.deepEqual(
        await runInNode(
          'main2.js',
          '../04-loader-reading-http/loader.js',
          '../05-loader-transforming-ts/loader.js',
          '../03-loader-resolving-overrides/loader.js',
        ),
        ['42'],
      )
    })

    it('should pass if the order is this', async () => {
      assert.deepEqual(
        await runInNode(
          'main2.js',
          '../03-loader-resolving-overrides/loader.js',
          '../04-loader-reading-http/loader.js',
          '../05-loader-transforming-ts/loader.js',
        ),
        ['42'],
      )
    })

    it('should fail loading if ts loader is before http', async () => {
      await assert.rejects(
        () =>
          runInNode(
            'main2.js',
            '../05-loader-transforming-ts/loader.js',
            '../04-loader-reading-http/loader.js',
            '../03-loader-resolving-overrides/loader.js',
          ),
        /SyntaxError.*Missing initializer/,
      )
    })
  })
})
