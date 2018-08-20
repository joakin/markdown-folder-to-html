import test from "tape";

import page from "../lib/render-page";

test("Changes instances of <!--NAV--> with the navigation html", t => {
  t.equal(
    page("banana <!--NAV--> apple", "split", "tini"),
    "banana split apple"
  );
  t.end();
});

test("Changes instances of <!--CONTENT--> with the page content", t => {
  t.equal(
    page("banana <!--CONTENT--> apple", "nav", "tini"),
    "banana tini apple"
  );
  t.end();
});

test("Changes instances of <!--CONTENT--> with the page content", t => {
  const content =
    "<p>Hello</p>\n<pre><code>'$KEY$' =&gt; $VALUE$,\n</code></pre>\n<p>This breaks down the rendering?</p>\n";
  t.equal(
    page("<!--NAV--> banana <!--CONTENT--> apple", "nav", content),
    `nav banana ${content} apple`
  );
  t.end();
});
