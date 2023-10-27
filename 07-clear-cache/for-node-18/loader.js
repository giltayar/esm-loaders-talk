import module from 'node:module'

export async function resolve(specifier, context, nextResolve) {
  const {url, ...rest} = await nextResolve(specifier, context)

  if (url.startsWith('node:')) {
    return {url, ...rest}
  }

  const newUrl = addQueryToUrl(url, '__generation', globalThis.__generation)

  return {url: newUrl, ...rest}
}

globalThis.__generation = 0

function addQueryToUrl(url, name, value) {
  const u = new URL(url)

  u.searchParams.set(name, value)

  return u.href
}

if (module.register) {
  module.register(import.meta.url)
}
