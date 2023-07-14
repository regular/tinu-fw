const fs = require('fs')
const {parse, join, resolve, relative} = require('path')

const makefile_path = join(__dirname, "..", "./app/tirtos/ccs/_tinu-fw.mak")

module.exports = function makefile(files) {
  const wd = parse(makefile_path).dir
  files = files.map(p=>{
    const abspath = resolve(p)
    const relpath = relative(wd, abspath)
    return relpath
  })
  const content = files.map(makeRule).join('\n\n')
  fs.writeFileSync(makefile_path, content, 'utf-8')
}

function makeRule(sourcefile) {
  const {base, name, ext} = parse(sourcefile)

  if (['.c', '.cpp'].includes(ext.toLowerCase())) {
    return [
      `${name}.obj: ${sourcefile} $(CONFIGPKG)/compiler.opt`,                                                              
        '\t@ echo Building $@',
        '\t@ $(CC) $(CFLAGS) $< --cmd_file=$(CONFIGPKG)/compiler.opt --output_file=$@',
      `OBJECTS += ${name}.obj`
    ].join('\n')
  }
  throw Error(`Don't know how to make a rule for ${sourcefile}`)
}
