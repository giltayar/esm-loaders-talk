import {execaNode} from 'execa'

export async function runInNode(file, ...loaders) {
  return (
    await execaNode(file, undefined, {
      all: true,
      nodeOptions: [
        '--no-warnings',
        ...(loaders ? loaders.map((l) => `--loader=./${l}`) : []),
      ],
    })
  ).all.split('\n')
}
