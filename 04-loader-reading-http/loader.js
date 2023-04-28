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

export async function resolve(specifier, context, nextResolve) {
  if (isBareSpecifier(specifier)) {
    return await nextResolve(specifier, context)
  }

  const url = new URL(specifier, context.parentURL).href

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return {url, shortCircuit: true}
  }

  return await nextResolve(specifier, context)
}

function isBareSpecifier(specifier) {
  if (specifier.startsWith('.')) {
    return false
  }

  // is it an absolute url?
  try {
    new URL(specifier)
  } catch {
    // it's not!
    return true
  }

  return false
}
