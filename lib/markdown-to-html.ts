import url from "url";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import mdUrl from "./markdown-url-to-html";

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(transformLocalMdLinksToHTML)
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "heading-anchor-permalink",
    permalinkSymbol: "#"
  });

function transformLocalMdLinksToHTML(md: any) {
  const defaultLinkOpenRender =
    md.renderer.rules.link_open ||
    function(tokens: any, idx: any, options: any, env: any, self: any) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.link_open = function(
    tokens: any,
    idx: any,
    options: any,
    env: any,
    self: any
  ) {
    const a = tokens[idx];
    const href = a.attrGet("href");
    if (href) {
      a.attrSet("href", localMarkdownLinkToHtmlLink(href));
    }
    return defaultLinkOpenRender(tokens, idx, options, env, self);
  };
}

export default function md2html(contents: string) {
  return markdown.render(contents);
}

function localMarkdownLinkToHtmlLink(hrefAttr: string) {
  const href = url.parse(hrefAttr);
  if (!href.protocol && !href.host) {
    // Local link
    return mdUrl(hrefAttr);
  }
  return hrefAttr;
}
