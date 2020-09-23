import path from "path";
import { URL } from "url";
import mdR from "./markdown-regex";

export default function mdUrl(file: string) {
  const { base, dir } = path.parse(file);
  const url = new URL(`http://mdUrl/${base}`);
  
  let output = url.pathname.substring(1).replace(mdR, ".html");

  if (dir.length > 0) {
    output = `${dir}/${output}`;
  }
  if (url.searchParams) {
    output += url.search
  }
  if (url.hash) {
    output += url.hash;
  }

  return output
}
