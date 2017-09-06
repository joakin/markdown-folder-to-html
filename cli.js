#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const sh = require("shelljs");

const groupByPath = require("./lib/group-by-path");
const sortByPreferences = require("./lib/sort-by-preferences");
const mdUrl = require("./lib/markdown-url-to-html");
const md2html = require("./lib/markdown-to-html");
const renderNav = require("./lib/render-nav");
const generateIndexInfo = require("./lib/generate-index-info");
const page = require("./lib/render-page");
const mdR = require("./lib/markdown-regex");

const [docsFolder, ...argsRest] = process.argv.slice(2);

// Default parameters
const folder = docsFolder || "docs";
const output = `_${folder}`;
const templateFilename = "template.html";
const preferences = ["index.md", "README.md"];

// Guards
// Bail out if more than 1 args
if (argsRest && argsRest.length > 0) {
  console.error("Too may arguments");
  usage(true);
}

// Bail out if the folder doesn't exist
if (!sh.test("-e", folder)) {
  console.error(
    `Folder ${folder} not found at ${path.join(process.cwd(), folder)}`
  );
  usage(true);
}

// Define template html, user's first, otherwise default
let template = path.join(folder, templateFilename);
if (!sh.test("-e", template)) {
  template = path.join(__dirname, folder, templateFilename);
}
const tpl = sh.cat(template);

// Prepare output folder (create, clean, copy sources)
sh.mkdir("-p", output);
sh.rm("-rf", output + "/*");
sh.cp("-R", folder + "/*", output);

// Start processing. Outline:
//
// 1. Get all files
// 2. Sort them
// 3. Group them hierachically
// 4. Parse files and generate output html files

sh.cd(output);
const all = sh.find("*");

const mds = all
  .filter(f => f.match(mdR))
  .sort(sortByPreferences.bind(null, preferences));

const groupedMds = mds.reduce(groupByPath, []);

mds
  .map(f => {
    const navHtml = renderNav(generateIndexInfo(f, groupedMds, output));
    const contentHtml = md2html(sh.cat(f));
    return [f, page(tpl, navHtml, contentHtml)];
  })
  .forEach(([f, p]) => fs.writeFileSync(mdUrl(f), p));

sh.rm("-r", "**/*.md");

function usage(error) {
  console.log(
    `
Usage:

  markdown-folder-to-html [input-folder]

    input-folder [optional] defaults to \`docs\`
  `
  );
  process.exit(error ? 1 : 0);
}