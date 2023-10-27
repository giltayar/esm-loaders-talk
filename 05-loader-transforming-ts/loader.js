import {transform} from 'esbuild'
import module from 'node:module'

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts')) {
    const {source, format} = await nextLoad(url, {...context, format: 'module'})

    const {code} = await transform(source, {loader: 'ts'})

    return {source: code, format}
  }

  return await nextLoad(url, context)
}

if (module.register) {
  module.register(import.meta.url)
}
