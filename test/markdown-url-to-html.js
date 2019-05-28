"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const markdown_url_to_html_1 = __importDefault(require("../lib/markdown-url-to-html"));
tape_1.default("it changes the extension of a markdown url to reference an html file", t => {
    t.equal(markdown_url_to_html_1.default("banana/split.md"), "banana/split.html");
    t.end();
});
