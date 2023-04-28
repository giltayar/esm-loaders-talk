import {a} from 'http://localhost:3000/a.js'
import {b} from 'http://localhost:3000/b.ts'

console.log(a + b)

// imports used to check that loader works in other cases
import 'node:fs'
import 'right-pad'
import '../06-loader-chaining/a.js'
