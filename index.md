# markdown-folder-to-html

Simplest way zero-config to generate html docs from markdown files.

Copies `docs` to `_docs` and compiles markdown files to html using
`docs/template.html`.

## Usage

1. Install `npm install -D markdown-folder-to-html` (You can install globally
   too if inclined)
3. Add `docs` to npm scripts `{"scripts": {"docs": "markdown-folder-to-html"}}`
2. Create `docs`
  1. `mkdir -p docs`
  2. Add some docs `echo "**Banana**" > docs/banana.md`
  3. Add some docs `echo "**Apple**" > docs/index.md`
5. 🎉 `npm run docs` and `open _docs/index.html`

## Custom HTML

The default HTML is extremely basic, but [simple and
pretty](https://github.com/joakin/markdown-folder-to-html/blob/master/docs/template.html),
and is the one used in the docs.

This is the basic template that would work:

```html
<!doctype html>
<html>
<body>
<nav>
	<!--NAV-->
</nav>
<article>
	<!--CONTENT-->
</article>
</body>
</html>
```

Create your own in your docs folder `docs/template.html` to use that one
instead. Feel free to include styles inline or CSS files (since all will be
copied to output).

## Links

* https://github.com/joakin/markdown-folder-to-html
* https://npmjs.org/package/markdown-folder-to-html
