let generation = 0

export async function resolve(specifier, context, nextResolve) {
  const {url, ...rest} = await nextResolve(specifier, context)

  if (url.startsWith('node:')) {
    return {url, ...rest}
  }

  const newUrl = addQueryToUrl(url, '__generation', generation)

  return {url: newUrl, ...rest}
}

export function globalPreload(context) {
  context.port.onmessage = ({data}) => {
    const {generation: generation_, msgAck} = data

    generation = generation_

    Atomics.store(msgAck, 0, 1)
    Atomics.notify(msgAck, 0)
  }

  return `globalThis.__ccLoaderPort = port`
}

function addQueryToUrl(url, name, value) {
  const u = new URL(url)

  u.searchParams.set(name, value)

  return u.href
}
