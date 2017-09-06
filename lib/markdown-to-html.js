const url = require("url");
const markdown = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true
}).use(transformLocalMdLinksToHTML);
const mdUrl = require("./markdown-url-to-html");

function transformLocalMdLinksToHTML(md) {
  const defaultLinkOpenRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const a = tokens[idx];
    const href = a.attrGet('href');
    if (href) {
      a.attrSet('href', localMarkdownLinkToHtmlLink(href));
    }
    return defaultLinkOpenRender(tokens, idx, options, env, self);
  }
}

module.exports = function md2html(contents) {
  return markdown.render(contents.toString());
}

function localMarkdownLinkToHtmlLink(hrefAttr) {
  const href = url.parse(hrefAttr);
  if (!href.protocol && !href.host) {
    // Local link
    return mdUrl(hrefAttr);
  }
  return hrefAttr;
}