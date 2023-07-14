const makefile = require('./lib/makefile')
const make = require('./lib/make')

async function main() {
  try {
    makefile(['app/main.cpp', 'app/chiptypes.cpp'])
    await make()
  } catch(err) {
    console.error(err.message)
    process.exit(1)
  }
}

main()
