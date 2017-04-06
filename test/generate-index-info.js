const test = require("tape");

const groupByPath = require("../lib/group-by-path");
const generateIndexInfo = require("../lib/generate-index-info");

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
  t.ok(treeInfoFirstIsCurrent[0].active);
  t.end();
});

test("leaf file has text property that has been parsed", t => {
  t.equal(treeInfoFirstIsCurrent[1].text, "banana");
  t.end();
});

test("nested files are kept in a hierarchy as an array", t => {
  t.equal(
    treeInfoFirstIsCurrent[2].constructor,
    Array,
    "The nested tree is still an array"
  );
  t.equal(
    treeInfoFirstIsCurrent[2][0],
    "nested",
    "Heading is in the first position"
  );
  t.equal(
    treeInfoFirstIsCurrent[2][1].length,
    2,
    "Second position has array of children"
  );
  t.end();
});

test("whole structure matches (for reference)", t => {
  // Verify whole structure
  t.deepEqual(treeInfoFirstIsCurrent, [
    {
      active: true,
      href: "index.html",
      text: "index"
    },
    {
      active: false,
      href: "1-banana.html",
      text: "banana"
    },
    [
      "nested",
      [
        {
          active: false,
          href: "nested/another-banana.html",
          text: "another banana"
        },
        {
          active: false,
          href: "nested/so_apple.html",
          text: "so apple"
        }
      ]
    ]
  ]);
  t.end();
});

test("properly generates the hrefs as relative paths when current file is a nested one", t => {
  const treeInfoNestedIsCurrent = generateIndexInfo(files[2], grouped);
  t.equal(treeInfoNestedIsCurrent[0].href, "../index.html");
  t.equal(treeInfoNestedIsCurrent[1].href, "../1-banana.html");
  t.equal(treeInfoNestedIsCurrent[2][1][1].href, "so_apple.html");
  t.end();
});
