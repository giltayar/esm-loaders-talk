let generation = 0

export function clearCache() {
  generation++

  sendGenerationToLoader(generation)
}

function sendGenerationToLoader(generation) {
  if (!globalThis.__ccLoaderPort) return

  const msgAck = new Int32Array(new SharedArrayBuffer(4))

  globalThis.__ccLoaderPort.postMessage({generation, msgAck})

  Atomics.wait(msgAck, 0, 0)
}
