import {execaNode} from 'execa'

export async function runInNodeLoader(file, ...loaders) {
  return (
    await execaNode(file, undefined, {
      all: true,
      env: {FORCE_COLOR: '0'},
      nodeOptions: [
        '--no-warnings',
        ...(loaders ? loaders.map((l) => `--loader=./${l}`) : []),
      ],
    })
  ).all.split('\n')
}

export async function runInNodeImport(file, ...loaders) {
  return (
    await execaNode(file, undefined, {
      all: true,
      env: {FORCE_COLOR: '0'},
      nodeOptions: [
        '--no-warnings',
        ...(loaders ? loaders.map((l) => `--import=./${l}`) : []),
      ],
    })
  ).all.split('\n')
}

runInNodeImport.supports = process.versions.node.startsWith('20.')
