const test = require('tape')

const mdR = require('../lib/markdown-regex')

test('matches files with md extension', (t) => {
  t.ok(mdR.test('banana.md'))
  t.notOk(mdR.test('banana.md.other'))
  t.notOk(mdR.test('bananamd'))
  t.end()
})
