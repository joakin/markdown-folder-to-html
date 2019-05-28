"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const markdown_url_to_html_1 = __importDefault(require("./markdown-url-to-html"));
const markdown = markdown_it_1.default({
    html: true,
    linkify: true,
    typographer: true
}).use(transformLocalMdLinksToHTML);
function transformLocalMdLinksToHTML(md) {
    const defaultLinkOpenRender = md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const a = tokens[idx];
        const href = a.attrGet("href");
        if (href) {
            a.attrSet("href", localMarkdownLinkToHtmlLink(href));
        }
        return defaultLinkOpenRender(tokens, idx, options, env, self);
    };
}
function md2html(contents) {
    return markdown.render(contents);
}
exports.default = md2html;
function localMarkdownLinkToHtmlLink(hrefAttr) {
    const href = url_1.default.parse(hrefAttr);
    if (!href.protocol && !href.host) {
        // Local link
        return markdown_url_to_html_1.default(hrefAttr);
    }
    return hrefAttr;
}
