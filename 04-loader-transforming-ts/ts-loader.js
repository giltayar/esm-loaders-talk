import {pathToFileURL} from 'node:url'
import {transform} from 'esbuild'

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts')) {
    const {source, format} = await nextLoad(url, {...context, format: 'module'})

    const {code} = await transform(source, {loader: 'ts'})

    return {source: code, format}
  }

  return await nextLoad(url, context)
}

export async function resolve(specifier, context, nextResolve) {
  if (!isBareSpecifier(specifier) && specifier.endsWith('.ts')) {
    return {
      url: new URL(specifier, context.parentURL ?? cwdUrl).href,
      shortCircuit: true
    }
  }

  return await nextResolve(specifier, context)
}

const cwdUrl = pathToFileURL(process.cwd())

function isBareSpecifier(specifier) {
  if (specifier.startsWith('.')) {
    return false
  }

  // is it an absolute url?
  try {
    new URL(specifier)
  } catch (_) {
    // it's not!
    return true
  }

  return true
}