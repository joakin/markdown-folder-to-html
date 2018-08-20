import test from "tape";

import group from "../lib/group-by-path";

test("given a group of paths, it groups them in arrays when reducing over them", t => {
  const paths = [
    "index",
    "banana",
    "nested/banana",
    "nested/apple",
    "nested/super nested/thing"
  ];

  const groupedPaths = [
    "index",
    "banana",
    [
      "nested",
      [
        "nested/banana",
        "nested/apple",
        ["super nested", ["nested/super nested/thing"]]
      ]
    ]
  ];

  t.deepEqual(paths.reduce(group, []), groupedPaths);
  t.end();
});
