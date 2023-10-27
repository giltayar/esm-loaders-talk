import module from 'node:module'

let generation = 0
let portToLoader = undefined

export function clearCache() {
  generation++

  sendGenerationToLoader(generation)
}

function sendGenerationToLoader(generation) {
  const msgAck = new Int32Array(new SharedArrayBuffer(4))

  portToLoader.postMessage({generation, msgAck})

  Atomics.wait(msgAck, 0, 0)
}

if (module.register) {
  const {port1, port2} = new MessageChannel()

  portToLoader = port1

  module.register(new URL('loader.js', import.meta.url), {
    data: {port: port2},
    transferList: [port2],
  })
}
