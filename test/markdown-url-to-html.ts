import test from "tape";

import mdUrl2Html from "../lib/markdown-url-to-html";

test("it changes the extension of a markdown url to reference an html file", t => {
  t.equal(mdUrl2Html("banana/split.md"), "banana/split.html");
  t.end();
});

test("it adds the link anchor to the html file name", t => {
  t.equal(mdUrl2Html("banana/split.md#anchor"), "banana/split.html#anchor");
  t.end();
});

test("it adds query parameters to the html file name", t => {
  t.equal(mdUrl2Html("banana/split.md?a=b"), "banana/split.html?a=b");
  t.end();
});

test("it adds anchor and query parameters to the html file name", t => {
  t.equal(mdUrl2Html("banana/split.md?a=b#anchor"), "banana/split.html?a=b#anchor");
  t.end();
});
