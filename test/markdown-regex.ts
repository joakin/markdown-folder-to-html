import test from "tape";

import mdR from "../lib/markdown-regex";

test("matches files with md extension", t => {
  t.ok(mdR.test("banana.md"));
  t.notOk(mdR.test("banana.md.other"));
  t.notOk(mdR.test("bananamd"));
  t.end();
});
