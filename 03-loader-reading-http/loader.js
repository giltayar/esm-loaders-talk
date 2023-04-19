export async function load(url, context, nextLoad) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const response = await fetch(url, {redirect: 'follow'})

    if (!response.ok) throw new Error(`module not found ${url}`)

    const source = await response.text()

    return {
      shortCircuit: true,
      format: 'module',
      source
    }
  } else {
    return await nextLoad(url, {context})
  }
}

// Normally Node.js would error on specifiers starting with 'https://', so
// this hook intercepts them and converts them into absolute URLs to be
// passed along to the later hooks below.
export function resolve(specifier, context, nextResolve) {
  if (isBareSpecifier(specifier)) {
    return nextResolve(specifier, context)
  }

  const { parentURL = undefined } = context;
  const url = new URL(specifier, parentURL).href

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return {
      shortCircuit: true,
      url,
    };
  }

  return nextResolve(specifier, context);
}

function isBareSpecifier(specifier) {
  if (specifier.startsWith('.')) {
    return false
  }

  // is it an absolute url?
  try {
    new URL(specifier)
  } catch (_) {
    // it's not an absolute url!
    return true
  }

  return false
}