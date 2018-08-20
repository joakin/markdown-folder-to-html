export interface MarkdownFile {
  path: string;
  url: string;
  content: string;
  html: string;
}

export type FileTree<NodeType> = FileNode<NodeType>[];

export type FileNode<NodeType> = FileFolder<NodeType> | File<NodeType>;

export interface File<NodeType> {
  type: "file";
  value: NodeType;
}

export interface FileFolder<NodeType> {
  type: "dir";
  name: string;
  children: FileTree<NodeType>;
}

export type StringFile = string;

export interface IndexFile {
  active: boolean;
  href: string;
  text: string;
}
