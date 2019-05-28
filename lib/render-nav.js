"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_never_1 = __importDefault(require("./assert-never"));
function renderNav(groupedFiles, level = 0) {
    return `<ul>
${groupedFiles
        .map(f => {
        if (f.type === "dir") {
            const childrenNav = renderNav(f.children, level + 1);
            const indexFile = getIndexFile(f.children);
            // Heading with link if there is an index file in the folder
            if (indexFile) {
                const link = renderActive(f.name, indexFile.value.href, indexFile.value.active);
                return `<li class="heading"><a class="header-link">${link}</a>${childrenNav}</li>\n`;
            }
            // Heading without link
            return `<li class="heading"><a class="header-link"><span>${f.name}</span></a>${childrenNav}</li>\n`;
        }
        else if (f.type === "file") {
            //  Leaf
            const { text, href, active } = f.value;
            // Skip index files on nested levels since the Heading links to them.
            if (level > 0 && text && text.toLowerCase() === "index")
                return;
            return `<li>${renderActive(text, href, active)}</li>`;
        }
        return assert_never_1.default(f);
    })
        .join("\n")}
</ul>`;
}
exports.default = renderNav;
function renderActive(text, href, active) {
    return `<a class="${active ? "active" : ""}" href="${href}">${text}</a>`;
}
function getIndexFile(files) {
    return files.find(e => e.type === "file" && e.value.text === "index"); // Stupid TS
}
