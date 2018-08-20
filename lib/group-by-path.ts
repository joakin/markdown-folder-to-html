import { FileTree, FileFolder, FileNode, StringFile } from "./types";
import { assert } from "console";

export default function groupByPath(
  tree: FileTree<StringFile>,
  value: string
): FileTree<StringFile> {
  const paths = value.split("/");
  let currentTree = tree;
  paths.forEach((path, i) => {
    // If we're on the last path segment, we just add it
    if (i === paths.length - 1) {
      currentTree.push({ type: "file", value });
    } else {
      let folder: FileNode<StringFile> | undefined = currentTree.find(
        f => f.type === "dir" && f.name === path
      );
      // Check again for type file, but we filtered above... typescript stuff
      if (!folder || folder.type === "file") {
        folder = { type: "dir", name: path, children: [] };
        currentTree.push(folder);
      }
      currentTree = folder.children;
    }
  });
  return tree;
}
