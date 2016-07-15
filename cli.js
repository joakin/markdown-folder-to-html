#! /usr/bin/env node

const fs = require('fs')
const url = require('url')
const path = require('path')
const sh = require('shelljs')
const commonmark = require('commonmark')

const reader = new commonmark.Parser()
const writer = new commonmark.HtmlRenderer()

const folder = 'docs'
const output = '_docs'

const precedence = ['index.md', 'README.md']

if (!sh.test('-e', folder)) {
  console.error(`Folder ${folder} not found at ${process.cwd()}`)
  process.exit(1)
}

let template = path.join(folder, 'template.html')
if (!sh.test('-e', template)) {
  template = path.join(__dirname, 'docs', 'template.html')
}

const tpl = sh.cat(template)
const contentR = /<!--CONTENT-->/g
const navR = /<!--NAV-->/g
const mdR = /\.md$/

sh.mkdir('-p', output)
sh.rm('-rf', output + '/*')
sh.cp('-R', folder + '/*', output)

const all = sh.find(output)
const mds = all.filter((f) => f.match(mdR))
  .sort(sortByPrecedence)

mds
  .map((f) => [f, page(nav(f, mds), md2html(sh.cat(f)))])
  .forEach(([f, p]) => fs.writeFileSync(mdUrl(f), p))

function nav (current, files) {
  const currentDir = path.dirname(current)

  return `<ul>
${files.map((f) => {
  const clazz = f === current ? 'active' : ''
  const href = mdUrl(path.relative(currentDir, f))
  const text = pathToText(f)
  return `<li><a class="${clazz}" href="${href}">${text}</a></li>`
}).join('\n')}
</ul>`
}

function removeOutput (s) {
  return s.replace(output + '/', '')
}

function md2html (cnts) {
  const parsed = reader.parse(cnts)
  const walker = parsed.walker()
  let event, node

  while ((event = walker.next())) {
    node = event.node
    if (event.entering && node.type === 'link') {
      let href = url.parse(node._destination)
      if (!href.protocol && !href.host) {
        // Local link
        node._destination = mdUrl(node._destination)
      }
    }
  }
  return writer.render(parsed)
}

function page (navmenu, content) {
  return tpl.replace(navR, navmenu).replace(contentR, content)
}

function mdUrl (file) {
  return file.replace(mdR, '.html')
}

function pathToText (file) {
  return removeOutput(file)
    // Replace start of folder or file digits \d+ and dash out
    // 100-banana/10-apple/01-banana -> banana/apple/banana
    .replace(/(^|\/)(\d+-)/g, '$1')
    // Remove extension
    .replace(mdR, '')
    // Replace _ with spaces
    .replace(/_/g, ' ')
}

function isPreferent (x) { return precedence.indexOf(removeOutput(x)) > -1 }

function sortByPrecedence (a, b) {
  const aPref = isPreferent(a)
  const bPref = isPreferent(b)
  return (
    aPref && bPref ? strSort(a, b)
      : (aPref ? -1
        : (bPref ? 1
          : strSort(a, b)))
  )
}

function strSort (a, b) {
  return (a < b ? -1 : (a > b ? 1 : 0))
}
