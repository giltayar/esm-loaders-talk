import {it, before, after, describe} from 'node:test'
import assert from 'node:assert/strict'
import {runInNode} from './run-in-node.js'
import {execa} from 'execa'
import retry from 'p-retry'

process.chdir('06-loader-chaining')

describe('06-loader-chaining', () => {
  const killServeProcess = new AbortController()

  before(async () => {
    try {
      execa('../node_modules/.bin/serve', ['-l', '3000', '.'], {
        signal: killServeProcess.signal,
      })
    } catch (error) {
      console.log(error)
    }

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
        '../03-loader-reading-http/loader.js',
        '../04-loader-transforming-ts/loader.js',
        '../05-loader-resolving-overrides/loader.js'
      ),
      ['4 2']
    )
  })
})
