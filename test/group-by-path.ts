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
    { type: "file", value: "index" },
    { type: "file", value: "banana" },
    {
      type: "dir",
      name: "nested",
      children: [
        { type: "file", value: "nested/banana" },
        { type: "file", value: "nested/apple" },
        {
          type: "dir",
          name: "super nested",
          children: [
            {
              type: "file",
              value: "nested/super nested/thing"
            }
          ]
        }
      ]
    }
  ];

  t.deepEqual(paths.reduce(group, []), groupedPaths);
  t.end();
});
