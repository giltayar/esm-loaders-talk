import {clearCache} from './loader-api.js'
import fs from 'node:fs'

await import('./module.js')

clearCache()

await import('./module.js')
