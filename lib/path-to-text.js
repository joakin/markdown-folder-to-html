const mdR = require("./markdown-regex");

module.exports = function pathToText(file, outputPath) {
  // Remove output folder if there is one
  return (
    (outputPath ? file.replace(outputPath + "/", "") : file)
      // Replace start of folder or file digits \d+ and dash out
      // 100-banana/10-apple/01-banana -> banana/apple/banana
      .replace(/(^|\/)(\d+-)/g, "$1")
      // Remove extension
      .replace(mdR, "")
      // Replace _ and - with spaces
      .replace(/_|-/g, " ")
  );
};
