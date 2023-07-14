const {spawn} = require('child_process')
const p = require('path')
const loner = require('loner')
const {BufferList} = require('bl')

module.exports = function make() {
  return new Promise( (resolve, reject)=>{
    const make = spawn('./make.sh', [], {
      cwd: p.resolve(__dirname, '..'),
      shell: true,
      stdio: [0, 'pipe', 2],
      env: Object.assign({}, process.env, {
        NAME: 'bla'
      })
    })
    const l = loner('\n')
    make.on('error', reject)
    make.stdout.pipe(l)
    let lastLine
    make.on('exit', code=>{
      if (code !== 0) return reject(new Error(`Exit code is ${code}`))
        // -rw-r--r-- 1 regular regular 5236972 Jul 13 13:03 app/tirtos/ccs/sysbios_bigtime_fw.out
        const [mode, links, user, group, size, month, day, time, path] = lastLine.split(' ')
        console.log('firmware is at', path)
        resolve({
          size, path
        })
    })
    let buff = []
    l.on('data', data=>{
      process.stdout.write(data)
      if (data.length == 1 && data[0] == '\n'.charCodeAt(0)) {
        const line = BufferList(buff).toString('utf8')
        if (line.length) lastLine = line
        buff = []
      } else {
        buff.push(data)
      }
    })
  })
}


