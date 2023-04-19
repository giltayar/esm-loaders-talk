import fs from 'node:fs/promises'

const overrides = JSON.parse(await fs.readFile('overrides.json'))

export async function resolve(specifier, context, nextResolve) {
  if (specifier in overrides) {
    return await nextResolve(overrides[specifier], context)
  }

  return await nextResolve(specifier, context)
}
