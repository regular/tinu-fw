const {join} = require('path')
const makeFirmware = require('.')

async function main() {
  const files = [
    join(__dirname, 'main.cpp'),
    join(__dirname, 'chiptypes.cpp')
  ]
  const {size, path} = await makeFirmware('foo', files)
  console.log('Firmware is at', path)
}

main()

