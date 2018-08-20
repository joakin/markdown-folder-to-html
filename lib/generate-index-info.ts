import path from "path";
import pathToText from "./path-to-text";
import mdUrl from "./markdown-url-to-html";
import { FileTree, StringFile, IndexFile, FileNode } from "./types";
import assertNever from "./assert-never";

export default function generateIndexInfo(
  currentFile: string,
  groupedFiles: FileTree<StringFile>
): FileTree<IndexFile> {
  const currentDir = path.dirname(currentFile);

  return groupedFiles.map(
    (f: FileNode<StringFile>): FileNode<IndexFile> => {
      if (f.type === "dir") {
        return {
          type: "dir",
          name: pathToText(f.name),
          children: generateIndexInfo(currentFile, f.children)
        };
      } else if (f.type === "file") {
        const active = f.value === currentFile;
        const href = mdUrl(path.relative(currentDir, f.value));
        const parts = f.value.split("/");
        const text = pathToText(parts[parts.length - 1]);
        return { type: "file", value: { active, href, text } };
      }
      return assertNever(f); // Error out if we're not handling all FileNode cases
    }
  );
}
