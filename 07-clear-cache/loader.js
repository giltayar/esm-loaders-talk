export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('node:')) {
    return await nextResolve(specifier, context)
  }

  const {url, ...rest} = await nextResolve(specifier, context)

  const newUrl = addQueryToUrl(url, '__generation', globalThis.__generation)

  return {url: newUrl, ...rest}
}

globalThis.__generation = 0

function addQueryToUrl(url, name, value) {
  const u = new URL(url)

  u.searchParams.set(name, value)

  return u.href
}
