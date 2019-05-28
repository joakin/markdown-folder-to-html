#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const group_by_path_1 = __importDefault(require("./lib/group-by-path"));
const sort_by_preferences_1 = __importDefault(require("./lib/sort-by-preferences"));
const markdown_url_to_html_1 = __importDefault(require("./lib/markdown-url-to-html"));
const markdown_to_html_1 = __importDefault(require("./lib/markdown-to-html"));
const render_nav_1 = __importDefault(require("./lib/render-nav"));
const generate_index_info_1 = __importDefault(require("./lib/generate-index-info"));
const render_page_1 = __importDefault(require("./lib/render-page"));
const markdown_regex_1 = __importDefault(require("./lib/markdown-regex"));
const [docsFolder, ...argsRest] = process.argv.slice(2);
// Default parameters
const defaultFolder = "docs";
const folder = docsFolder || defaultFolder;
const segments = folder.split(path_1.default.sep);
const currentIndex = segments.length - 1;
const outputFolder = segments[currentIndex];
const output = `_${outputFolder}`;
const templateFilename = "template.html";
const contentsFilename = "contents.json";
const preferences = ["index.md", "README.md"];
// Guards
// Bail out if more than 1 args
if (argsRest && argsRest.length > 0) {
    console.error("Too may arguments");
    usage(true);
}
// Bail out if the folder doesn't exist
if (!shelljs_1.default.test("-e", folder)) {
    console.error(`Folder ${folder} not found at ${path_1.default.join(process.cwd(), folder)}`);
    usage(true);
}
// Define template html, user's first, otherwise default
let template = path_1.default.join(folder, templateFilename);
if (!shelljs_1.default.test("-e", template)) {
    template = path_1.default.join(__dirname, defaultFolder, templateFilename);
}
const tpl = shelljs_1.default.cat(template);
// Prepare output folder (create, clean, copy sources)
shelljs_1.default.mkdir("-p", output);
shelljs_1.default.rm("-rf", output + "/*");
shelljs_1.default.cp("-R", folder + "/*", output);
// Start processing. Outline:
//
// 1. Get all files
// 2. Sort them
// 3. Group them hierachically
// 4. Parse files and generate output html files
shelljs_1.default.cd(output);
const all = shelljs_1.default.find("*");
const mds = all
    .filter(file => file.match(markdown_regex_1.default))
    .sort(sort_by_preferences_1.default.bind(null, preferences))
    .map(file => {
    const content = shelljs_1.default.cat(file).toString(); // The result is a weird not-string
    return {
        path: file,
        url: markdown_url_to_html_1.default(file),
        content,
        html: markdown_to_html_1.default(content)
    };
});
const groupedMds = mds.reduce((grouped, value) => group_by_path_1.default(grouped, value.path), []);
mds.forEach(({ path, url, html }) => {
    const navHtml = render_nav_1.default(generate_index_info_1.default(path, groupedMds));
    const pageHtml = render_page_1.default(tpl, navHtml, html);
    fs_1.default.writeFileSync(url, pageHtml);
});
const contentsJSON = {
    paths: groupedMds,
    contents: mds.map((md, i) => (Object.assign({}, md, { id: i })))
};
fs_1.default.writeFileSync(contentsFilename, JSON.stringify(contentsJSON, null, 2));
shelljs_1.default.rm("-r", "**/*.md");
function usage(error) {
    console.log(`
Usage:

  markdown-folder-to-html [input-folder]

    input-folder [optional] defaults to \`docs\`
  `);
    process.exit(error ? 1 : 0);
}
