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

const [inputFolder, outputFolder, ...argsRest] = process.argv.slice(2);

// Default parameters
const defaultFolder = "docs";
const folder = inputFolder || defaultFolder;
const output = outputFolder || `_${folder}`;
const templateFilename = "template.html";
const contentsFilename = "contents.json";
const preferences = ["index.md", "README.md", "readme.md"];

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
  template = path.join(__dirname, defaultFolder, templateFilename);
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
const all = sh.find(".");

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

    input-folder output-folder [optional] defaults to \`docs\`
  `
  );
  process.exit(error ? 1 : 0);
}
