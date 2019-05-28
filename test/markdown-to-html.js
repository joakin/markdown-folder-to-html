"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const markdown_to_html_1 = __importDefault(require("../lib/markdown-to-html"));
tape_1.default("transforms markdown to html", t => {
    t.equal(markdown_to_html_1.default("**banana** _split_ hey"), "<p><strong>banana</strong> <em>split</em> hey</p>\n");
    t.end();
});
tape_1.default("transforms local markdown links to html links", t => {
    t.equal(markdown_to_html_1.default("[banana](./banana/split.md)"), '<p><a href="./banana/split.html">banana</a></p>\n');
    t.end();
});
