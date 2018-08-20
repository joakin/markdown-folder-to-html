import test from "tape";

import md2html from "../lib/markdown-to-html";

test("transforms markdown to html", t => {
  t.equal(
    md2html("**banana** _split_ hey"),
    "<p><strong>banana</strong> <em>split</em> hey</p>\n"
  );
  t.end();
});

test("transforms local markdown links to html links", t => {
  t.equal(
    md2html("[banana](./banana/split.md)"),
    '<p><a href="./banana/split.html">banana</a></p>\n'
  );
  t.end();
});
