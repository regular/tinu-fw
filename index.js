const buildEnv = require('./lib/build-env')
const makefile = require('./lib/makefile')
const make = require('./lib/make')

module.exports = async function makeFirmware(name, files) {
  const buildDir = await buildEnv(files)
  console.error(`Building ${name} in ${buildDir}`)
  makefile(buildDir, files)
  return make(buildDir, name)
}
