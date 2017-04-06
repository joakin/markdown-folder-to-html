const path = require("path");
const pathToText = require("./path-to-text");
const mdUrl = require("./markdown-url-to-html");

module.exports = function generateIndexInfo(currentFile, groupedFiles) {
  const currentDir = path.dirname(currentFile);

  return groupedFiles.map(f => {
    if (Array.isArray(f)) {
      //
      return [pathToText(f[0]), generateIndexInfo(currentFile, f[1])];
    } else {
      //  LEAF
      const active = f === currentFile;
      const href = mdUrl(path.relative(currentDir, f));
      const parts = f.split("/");
      const text = pathToText(parts[parts.length - 1]);
      return { active, href, text };
    }
  });
};
