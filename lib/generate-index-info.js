const path = require('path')
const pathToText = require('./path-to-text')
const mdUrl = require('./markdown-url-to-html')

// TODO: Figure out how to test, given the reliance in `path` and the `fs`
module.exports = function generateIndexInfo (current, groupedFiles, outputDir) {
  const currentDir = path.join(outputDir, path.dirname(current))

  return groupedFiles.map((f) => {
    if (Array.isArray(f)) {
      // HEADING
      return [
        pathToText(f[0], outputDir),
        generateIndexInfo(current, f[1], outputDir)
      ]
    } else {
      //  LEAF
      const active = f === current
      const href = mdUrl(path.relative(currentDir, path.join(outputDir, f)))
      const parts = f.split('/')
      const text = pathToText(parts[parts.length - 1], outputDir)
      return {active, href, text}
    }
  })
}
