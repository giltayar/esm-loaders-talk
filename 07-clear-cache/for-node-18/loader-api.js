import module from 'node:module'

export function clearCache() {
  globalThis.__generation++
}

if (module.register) {
  module.register(new URL('loader.js', import.meta.url))
}
