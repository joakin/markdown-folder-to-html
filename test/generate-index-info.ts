import test from "tape";

import groupByPath from "../lib/group-by-path";
import generateIndexInfo from "../lib/generate-index-info";
import { File, IndexFile } from "../lib/types";

const files = [
  "index.md",
  "1-banana.md",
  "nested/another-banana.md",
  "nested/so_apple.md"
];

const grouped = files.reduce(groupByPath, []);

// Generate info with the first file as the current one
const treeInfoFirstIsCurrent = generateIndexInfo(files[0], grouped);

test("current file has active property to true", t => {
  const first = treeInfoFirstIsCurrent[0];
  t.ok(first.type === "file" && first.value.active);
  t.end();
});

test("leaf file has text property that has been parsed", t => {
  const second = treeInfoFirstIsCurrent[1];
  t.equal(second.type === "file" && second.value.text, "banana");
  t.end();
});

test("nested files are kept in a hierarchy", t => {
  const third = treeInfoFirstIsCurrent[2];
  t.equal(third.type, "dir", "The nested tree is a dir");
  t.equal(
    third.type === "dir" && third.name,
    "nested",
    "Heading is in the first position"
  );
  t.equal(
    third.type === "dir" && third.children.length,
    2,
    "Second position has array of children"
  );
  t.end();
});

test("whole structure matches (for reference)", t => {
  // Verify whole structure
  t.deepEqual(treeInfoFirstIsCurrent, [
    {
      type: "file",
      value: {
        active: true,
        href: "index.html",
        text: "index"
      }
    },
    {
      type: "file",
      value: {
        active: false,
        href: "1-banana.html",
        text: "banana"
      }
    },
    {
      type: "dir",
      name: "nested",
      children: [
        {
          type: "file",
          value: {
            active: false,
            href: "nested/another-banana.html",
            text: "another banana"
          }
        },
        {
          type: "file",
          value: {
            active: false,
            href: "nested/so_apple.html",
            text: "so apple"
          }
        }
      ]
    }
  ]);
  t.end();
});

test("properly generates the hrefs as relative paths when current file is a nested one", t => {
  const treeInfoNestedIsCurrent = generateIndexInfo(files[2], grouped);
  const first = treeInfoNestedIsCurrent[0];
  const second = treeInfoNestedIsCurrent[1];
  const third = treeInfoNestedIsCurrent[2];
  t.equal(first.type === "file" && first.value.href, "../index.html");
  t.equal(second.type === "file" && second.value.href, "../1-banana.html");
  t.equal(
    third.type === "dir" && (third.children[1] as File<IndexFile>).value.href,
    "so_apple.html"
  );
  t.end();
});
