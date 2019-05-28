"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const render_page_1 = __importDefault(require("../lib/render-page"));
tape_1.default("Changes instances of <!--NAV--> with the navigation html", t => {
    t.equal(render_page_1.default("banana <!--NAV--> apple", "split", "tini"), "banana split apple");
    t.end();
});
tape_1.default("Changes instances of <!--CONTENT--> with the page content", t => {
    t.equal(render_page_1.default("banana <!--CONTENT--> apple", "nav", "tini"), "banana tini apple");
    t.end();
});
tape_1.default("Changes instances of <!--CONTENT--> with the page content", t => {
    const content = "<p>Hello</p>\n<pre><code>'$KEY$' =&gt; $VALUE$,\n</code></pre>\n<p>This breaks down the rendering?</p>\n";
    t.equal(render_page_1.default("<!--NAV--> banana <!--CONTENT--> apple", "nav", content), `nav banana ${content} apple`);
    t.end();
});
