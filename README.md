# markdown-folder-to-html

Simplest zero-config way to generate html docs from markdown files.

Copies `docs` to `_docs` and compiles markdown files to html using
`docs/template.html`.

[Live example at chimeces.com/markdown-folder-to-html](http://chimeces.com/markdown-folder-to-html/)

## Usage

Requires node.js >= 6

Given we have some docs:

1. `mkdir -p docs`
2. Add some docs `echo "**Banana**" > docs/banana.md`
3. Add some docs `echo "**Apple**" > docs/index.md`

### In a project

1. Install `npm install -D markdown-folder-to-html`
2. Add `docs` to npm scripts `{"scripts": {"docs": "markdown-folder-to-html"}}`
3. 🎉 `npm run docs` and `open _docs/index.html`

### Globally

1. Install `npm install -g markdown-folder-to-html`
2. 🎉 `markdown-folder-to-html` and `open _docs/index.html`

## Conventions

### Input/Output folder

You can pass an argument to the cli to change the input folder (by default
`docs`). That will change the output folder too to `_FOLDERNAME` (by default
`_docs`).

```bash
markdown-folder-to-html documentation
# Outputs site to _documentation
```

If you want to change the output folder name, just `mv` it to something else.

### Custom HTML

The default HTML is extremely basic, but
[simple and pretty](https://github.com/joakin/markdown-folder-to-html/blob/master/docs/template.html),
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

### Order

You may have noticed that files are sorted alphabetically. There's a little
trick where if you name your folders/files with XX-folder/XX-file (XX being a
number of 1+ digits) those numbers won't show up on the index of the pages,
giving you the ability to organize files both in the filesystem and in the
generated HTML site.

Also, the root `index.md` file will always show up at the beginning of the
index.

### Site contents and information for custom templates

If you want to do things with a custom template HTML you need the information of
the site. This will allow you to do things in the front-end UI, like adding
search to the static site with lunrjs or other things like adding buttons for
the next/previous article.

For this use cases, you will see a `contents.json` generated in your output
folder. It contains the hierarchical paths of the files, and the contents with
the original markup, the HTML, the original path and the transformed URL:

```json
{
  "paths": [
    {
      "type": "file",
      "value": "index.md"
    },
    {
      "type": "file",
      "value": "1-banana.md"
    },
    {
      "type": "dir",
      "name": "a-folder",
      "children": [
        {
          "type": "file",
          "value": "a-folder/with-a-post.md"
        }
      ]
    }
    //...
  ],
  "contents": [
    {
      "path": "index.md",
      "url": "index.html",
      "content": "# markdown-folder-to-html\n\nSimplest zero-config ...",
      "html": "<h1>markdown-folder-to-html</h1>\n<p>Simplest zero-config ...",
      "id": 0
    },
    {
      "path": "1-banana.md",
      "url": "1-banana.html",
      "content": "**Banana**\n\nYou can have [nested folders](./n...",
      "html": "<p><strong>Banana</strong></p>\n<p>You can have <a h...",
      "id": 1
    }
    //...
  ]
}
```

See the [JSON file](https://chimeces.com/markdown-folder-to-html/contents.json)
of our documentation site for an example.

You can then fetch this JSON file with JS from your template, and go crazy with
it, processing the contents to adapt them for search, looking for the
previous/next articles to link to them, etc.

If you have working examples of a template that does something interesting,
please let me know and I'll list them here!

## Why

After quite a lot of research, I couldn't find a simple and straightforward
solution to generating html docs from a folder full of markdown files that
relied on simple concepts. That is what this tool does:

- Simply copy everything over, and translate .md files to .html with a pure HTML
  layout (feel free to add CSS, or JS, or precompile those assets if you need
  to)
- .md links are rewritten to .html so that you can reference files with their
  real path on your markdown files and they'll work on the HTML version too.
- Provide sensible defaults and zero-configuration. JUST WORK.
- Use know abstraction, like the file system, pure HTML, etc

## Links

- https://github.com/joakin/markdown-folder-to-html
- https://npmjs.org/package/markdown-folder-to-html
