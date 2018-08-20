import test from "tape";

import mdUrl2Html from "../lib/markdown-url-to-html";

test("it changes the extension of a markdown url to reference an html file", t => {
  t.equal(mdUrl2Html("banana/split.md"), "banana/split.html");
  t.end();
});
