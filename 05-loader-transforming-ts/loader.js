import {transform} from 'esbuild'
import {isBareSpecifier} from '../commons/is-bare-specifier.js'

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts')) {
    const {source, format} = await nextLoad(url, {...context, format: 'module'})

    const {code} = await transform(source, {loader: 'ts'})

    return {source: code, format}
  }

  return await nextLoad(url, context)
}

export async function resolve(specifier, context, nextResolve) {
  if (isBareSpecifier) {
    return await nextResolve(specifier, context)
  }

  if (specifier.endsWith('.ts')) {
    return {
      url: new URL(specifier, context.parentURL).href,
      shortCircuit: true,
    }
  }

  return await nextResolve(specifier, context)
}
