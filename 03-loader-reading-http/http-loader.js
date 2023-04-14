export async function load(url, context, nextLoad) {
  if (url.startsWith('https://')) {
    const response = await fetch(url, {redirect: 'follow'})

    if (!response.ok) throw new Error(`module not found ${url}`)

    const source = await response.text()

    return {
      shortCircuit: true,
      format: 'module',
      source
    }
  } else {
    return await nextLoad(url, context)
  }
}

// Normally Node.js would error on specifiers starting with 'https://', so
// this hook intercepts them and converts them into absolute URLs to be
// passed along to the later hooks below.
export function resolve(specifier, context, nextResolve) {
  const { parentURL = null } = context;

  if (specifier.startsWith('https://')) {
    return {
      shortCircuit: true,
      url: specifier,
    };
  } else if (parentURL && parentURL.startsWith('https://')) {
    return {
      shortCircuit: true,
      url: new URL(specifier, parentURL).href,
    };
  }

  return nextResolve(specifier);
}
