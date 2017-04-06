const commonmark = require("commonmark");
const url = require("url");

const mdUrl = require("./markdown-url-to-html");

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

module.exports = function md2html(cnts) {
  const parsed = reader.parse(cnts);
  const walker = parsed.walker();
  let event;
  while ((event = walker.next())) {
    transform(event);
  }
  return writer.render(parsed);
};

function transform(event) {
  localMarkdownLinksToHtmlLink(event);
}

function localMarkdownLinksToHtmlLink(event) {
  let node = event.node;
  if (event.entering && node.type === "link") {
    let href = url.parse(node._destination);
    if (!href.protocol && !href.host) {
      // Local link
      node._destination = mdUrl(node._destination);
    }
  }
}
