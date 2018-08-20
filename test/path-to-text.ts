import test from "tape";

import toText from "../lib/path-to-text";

test("gets rid of the markdown extension", t => {
  t.equal(toText("banana.md"), "banana");
  t.end();
});

test("gets rid of the output dir", t => {
  t.equal(toText("_output/banana", "_output"), "banana");
  t.end();
});

test("gets rid of numbers at the front of the name on each sub level", t => {
  t.equal(
    toText("1-banana/20-apple/005-tomato/banana"),
    "banana/apple/tomato/banana"
  );
  t.end();
});

test("swaps - and _ for spaces", t => {
  t.equal(toText("banana-split/pina_colada"), "banana split/pina colada");
  t.end();
});
