import { FileTree, IndexFile, FileFolder, File } from "./types";
import assertNever from "./assert-never";

export default function renderNav(
  groupedFiles: FileTree<IndexFile>,
  level = 0
): string {
  return `<ul>
${groupedFiles
  .map(f => {
    if (f.type === "dir") {
      const childrenNav = renderNav(f.children, level + 1);
      const indexFile = getIndexFile(f.children);
      // Heading with link if there is an index file in the folder
      if (indexFile) {
        const link = renderActive(
          f.name,
          indexFile.value.href,
          indexFile.value.active
        );
        return `<li class="heading">${link}</li>\n${childrenNav}`;
      }
      // Heading without link
      return `<li class="heading"><span>${f.name}</span></li>\n${childrenNav}`;
    } else if (f.type === "file") {
      //  Leaf
      const { text, href, active } = f.value;

      // Skip index files on nested levels since the Heading links to them.
      if (level > 0 && text && text.toLowerCase() === "index") return;

      return `<li>${renderActive(text, href, active)}</li>`;
    }
    return assertNever(f);
  })
  .join("\n")}
</ul>`;
}

function renderActive(text: string, href: string, active: boolean) {
  return `<a class="${active ? "active" : ""}" href="${href}">${text}</a>`;
}

function getIndexFile(files: FileTree<IndexFile>): File<IndexFile> | undefined {
  return files.find(e => e.type === "file" && e.value.text === "index") as File<
    IndexFile
  >; // Stupid TS
}
