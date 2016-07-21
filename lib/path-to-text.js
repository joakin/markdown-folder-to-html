const mdR = require('./markdown-regex')

module.exports = function pathToText (file, outputPath) {
  // Remove output folder
  return file.replace(outputPath + '/', '')
    // Replace start of folder or file digits \d+ and dash out
    // 100-banana/10-apple/01-banana -> banana/apple/banana
    .replace(/(^|\/)(\d+-)/g, '$1')
    // Remove extension
    .replace(mdR, '')
    // Replace _ and - with spaces
    .replace(/_|-/g, ' ')
}
