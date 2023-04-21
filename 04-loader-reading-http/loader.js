import {isBareSpecifier} from '../commons/is-bare-specifier.js'

export async function load(url, context, nextLoad) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const response = await fetch(url, {redirect: 'follow'})

    if (!response.ok) throw new Error(`module not found ${url}`)

    const source = await response.text()

    return {
      shortCircuit: true,
      format: 'module',
      source,
    }
  } else {
    return await nextLoad(url, {context})
  }
}

export async function resolve(specifier, context, nextResolve) {
  if (isBareSpecifier(specifier)) {
    return await nextResolve(specifier, context)
  }

  const url = new URL(specifier, context.parentURL).href

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return {
      url,
      shortCircuit: true,
    }
  }

  return await nextResolve(specifier, context)
}