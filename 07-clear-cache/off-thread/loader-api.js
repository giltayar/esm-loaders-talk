let generation = 0

export function clearCache() {
  generation++

  sendGenerationToLoader(globalThis.__ccLoaderPort, generation)
}

function sendGenerationToLoader(port, generation) {
  if (!port) return

  const msgAck = new Int32Array(new SharedArrayBuffer(4))

  port.postMessage({generation, msgAck})

  Atomics.wait(msgAck, 0, 0)
}
