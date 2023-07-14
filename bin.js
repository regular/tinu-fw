const {join} = require('path')
const buildEnv = require('./lib/build-env')
const makefile = require('./lib/makefile')
const make = require('./lib/make')

async function main() {
  const files = [
    join(__dirname, 'main.cpp'),
    join(__dirname, 'chiptypes.cpp')
  ]

  try {
    const buildDir = await buildEnv(files)
    console.log('building in', buildDir)
    makefile(buildDir, files)
    await make(buildDir, 'foo')
  } catch(err) {
    console.error(err.stack)
    process.exit(1)
  }
}

main()

