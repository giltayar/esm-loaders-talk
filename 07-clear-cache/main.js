import {clearCache} from './loader-api.js'

await import('./module.js')

clearCache()

await import('./module.js')
