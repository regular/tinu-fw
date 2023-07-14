const make = require('./lib/make')

async function main() {
  try {
    await make()
  } catch(err) {
    console.error(err.message)
    process.exit(1)
  }
}

main()
