import test from "tape";

import sortByPreferences from "../lib/sort-by-preferences";

const sort = sortByPreferences.bind(null, ["index.md", "README.md"]);

test("sorts with normal string sort", t => {
  t.deepEqual([4, 2, 3, 1].sort(sort), [1, 2, 3, 4]);
  t.deepEqual(["a", "C", "A", "B", "~", "ab", "b"].sort(sort), [
    "A",
    "B",
    "C",
    "a",
    "ab",
    "b",
    "~"
  ]);
  t.end();
});

test("sorts but puts first preferent strings", t => {
  t.deepEqual(
    ["a", "C", "README.md", "A", "index.md", "B", "~", "ab", "b"].sort(sort),
    ["README.md", "index.md", "A", "B", "C", "a", "ab", "b", "~"]
  );
  t.end();
});
