import rightPad from 'https://esm.sh/right-pad@1.0.1'

console.log(rightPad('abc', 6, '.'))

// imports used to check that loader works in other cases
import 'node:fs'
import 'right-pad'
import '../commons/is-bare-specifier.js'
