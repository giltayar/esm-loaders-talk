import {clearCache} from './loader-api.js'

await import('./module.js')

clearCache()

await import('./module.js')

// imports used to check that loader works in other cases
import 'node:fs'
import 'os'
import 'right-pad'
import '../../06-loader-chaining/a.js'
