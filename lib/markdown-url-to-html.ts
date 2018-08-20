import mdR from "./markdown-regex";

export default function mdUrl(file: string) {
  return file.replace(mdR, ".html");
}
