import module from 'node:module'

export async function load(url, context, nextLoad) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const response = await fetch(url, {redirect: 'follow'})
    const source = await response.text()

    return {
      shortCircuit: true,
      format: 'module',
      source,
    }
  } else {
    return await nextLoad(url, context)
  }
}

if (module.register) {
  module.register(import.meta.url)
}
