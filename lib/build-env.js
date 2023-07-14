const fs = require('fs')
const {join, resolve, relative, parse} = require('path')
const {createHash} = require('crypto')
const {mkdirp} = require('mkdirp')
const {readdir, stat, chmod, exists} = require('fs/promises')

module.exports = async function buildDir(files) {
  const sha = createHash('sha256').update(
    files.map(f=>resolve(f)).join(',')
  ).digest('hex').slice(0, 14)
  const dest = join(process.env.HOME, '.tinu-fw', 'cache', sha)
  const there = fs.existsSync(dest)
  if (there) return dest

  await mkdirp(dest)
  const src = join(__dirname, '..', 'build-env-template')
  await findFiles(src, {action: copyFilesTo(dest)})
  return dest
}

// -- util
//
async function findFiles(src, opts) {
  opts = opts || {}
  if (!opts.root) opts.root = src
  const {action} = opts
  const files = await readdir(src)
  return Promise.all(files.map(async file=>{
    const p = join(src, file)
    const s = await stat(p)
    if (s.isDirectory()) {
      if (opts.depth == undefined || opts.depth > 0) {
        const newOpts = opts.depth ? Object.assign({}, opts, {depth: opts.depth - 1}) : opts
        return findFiles(p, newOpts)
      }
    }
    if (action) return action(p, opts)
    return Promise.resolve({src: p})
  }))
}


function copyFile(p, destname, opts) {
  opts = opts || {}

  return new Promise( (resolve, reject)=>{
    const ws = fs.createWriteStream(destname)
    let rs
    if (opts.replace) {
      const r = ary(opts.replace)
      const seqs = r.map(({find})=>find)
      rs = fs.createReadStream(p).pipe(loner.apply(null, seqs))
        .on('data', data=>{
          const found = r.find(({find})=>data == find)
          if (found) data = found.replaceWith
          process.stdout.write('(r)')
          ws.write(data)
        })
    } else {
      rs = fs.createReadStream(p).pipe(ws)
    }
    rs.on('error', reject)
      .on('close', ()=>{
        ws.close()
        resolve({src: p, dest: destname})
      })

  })
}

function copyFilesTo(dest) {
  return async function(p, opts) {
    const {root} = opts
    const relpath = relative(root, p)
    const destname = join(dest, processName(relpath, opts))
    const {dir} = parse(destname)
    await mkdirp(dir) 
    return copyFile(p, destname, opts)
  }
}

function processName(f) {
  return f
}
