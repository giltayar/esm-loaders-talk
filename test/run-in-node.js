import {execaNode} from 'execa'

export async function runInNode(file, loader) {
  return (
    await execaNode(file, {all: true}, [
      '--no-warnings',
      loader ? `--loader=./${loader}` : undefined,
    ])
  ).all.split('\n')
}
