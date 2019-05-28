"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const render_nav_1 = __importDefault(require("../lib/render-nav"));
tape_1.default("renders a ul with plain index item as a li", t => {
    t.equal(render_nav_1.default([
        {
            type: "file",
            value: { text: "banana", active: false, href: "bananalink" }
        }
    ]), '<ul>\n<li><a class="" href="bananalink">banana</a></li>\n</ul>');
    t.end();
});
tape_1.default("renders a active class when index item is active", t => {
    t.equal(render_nav_1.default([
        {
            type: "file",
            value: { text: "banana", active: true, href: "bananalink" }
        }
    ]), '<ul>\n<li><a class="active" href="bananalink">banana</a></li>\n</ul>');
    t.end();
});
tape_1.default("renders a heading and nested items when index item is array", t => {
    t.equal(render_nav_1.default([
        {
            type: "file",
            value: { text: "banana", active: true, href: "bananalink" }
        },
        {
            type: "dir",
            name: "headingtext",
            children: [
                {
                    type: "file",
                    value: {
                        text: "apple",
                        active: false,
                        href: "applelink"
                    }
                }
            ]
        }
    ]), `<ul>
<li><a class="active" href="bananalink">banana</a></li>
<li class="heading"><span>headingtext</span></li>
<ul>
<li><a class="" href="applelink">apple</a></li>
</ul>
</ul>`);
    t.end();
});
