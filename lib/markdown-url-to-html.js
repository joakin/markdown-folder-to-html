const mdR = require("./markdown-regex");

module.exports = function mdUrl(file) {
  return file.replace(mdR, ".html");
};
