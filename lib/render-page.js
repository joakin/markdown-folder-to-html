"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentS = "<!--CONTENT-->";
const navS = "<!--NAV-->";
function renderPage(template, navmenu, content) {
    return template
        .split(navS)
        .join(navmenu)
        .split(contentS)
        .join(content);
}
exports.default = renderPage;
