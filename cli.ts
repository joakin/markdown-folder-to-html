#! /usr/bin/env node

import fs from "fs";
import path from "path";
import sh from "shelljs";

import groupByPath from "./lib/group-by-path";
import sortByPreferences from "./lib/sort-by-preferences";
import mdUrl from "./lib/markdown-url-to-html";
import md2html from "./lib/markdown-to-html";
import renderNav from "./lib/render-nav";
import generateIndexInfo from "./lib/generate-index-info";
import page from "./lib/render-page";
import mdR from "./lib/markdown-regex";
import { FileTree, StringFile } from "./lib/types";

const [docsFolder, ...argsRest] = process.argv.slice(2);

// Default parameters
const defaultFolder = "docs";
const folder = path.resolve(docsFolder || defaultFolder);
const output = path.resolve(folder, "..", `_${path.basename(folder)}`);
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
if (!fs.existsSync(folder)) {
  console.error(`Folder ${folder} not found.`);
  usage(true);
}

// Define template html, user's first, otherwise default
let template = path.join(folder, templateFilename);
if (!fs.existsSync(template)) {
  template = path.join(__dirname, defaultFolder, templateFilename);
}
const tpl = fs.readFileSync(template, "utf8");

// Prepare output folder (create, clean, copy sources)
fs.mkdirSync(output, { recursive: true });
sh.rm("-rf", path.join(output, "*"));
sh.cp("-R", path.join(folder, "*"), output);

// Start processing. Outline:
//
// 1. Get all files
// 2. Sort them
// 3. Group them hierachically
// 4. Parse files and generate output html files

sh.cd(output);
const all = sh.find("*");

const mds = all
  .filter(file => file.match(mdR))
  .sort(sortByPreferences.bind(null, preferences))
  .map(file => {
    const content = sh.cat(file).toString(); // The result is a weird not-string
    return {
      path: file,
      url: mdUrl(file),
      content,
      html: md2html(content)
    };
  });

const groupedMds: FileTree<StringFile> = mds.reduce(
  (grouped: FileTree<StringFile>, value) => groupByPath(grouped, value.path),
  []
);

mds.forEach(({ path, url, html }) => {
  const navHtml = renderNav(generateIndexInfo(path, groupedMds));
  const pageHtml = page(tpl, navHtml, html);
  fs.writeFileSync(url, pageHtml);
});

const contentsJSON = {
  paths: groupedMds,
  contents: mds.map((md, i) => ({ ...md, id: i }))
};
fs.writeFileSync(contentsFilename, JSON.stringify(contentsJSON, null, 2));

sh.rm("-r", "**/*.md");

function usage(error: boolean) {
  console.log(
    `
Usage:

  markdown-folder-to-html [input-folder]

    input-folder [optional] defaults to \`docs\`
  `
  );
  process.exit(error ? 1 : 0);
}
