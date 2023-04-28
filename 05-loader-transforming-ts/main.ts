import {a} from './ts-module.ts'
import {b} from './js-module.js'

const sum: number = a + b

console.log(sum)

// imports used to check that loader works in other cases
import 'node:fs'
import 'os'
import 'right-pad'
import '../06-loader-chaining/a.js'
