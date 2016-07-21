const test = require('tape')

const page = require('../lib/render-page')

test('Changes instances of <!--NAV--> with the navigation html', (t) => {
  t.equal(
    page('banana <!--NAV--> apple', 'split', 'tini'),
    'banana split apple'
  )
  t.end()
})

test('Changes instances of <!--CONTENT--> with the page content', (t) => {
  t.equal(
    page('banana <!--CONTENT--> apple', 'nav', 'tini'),
    'banana tini apple'
  )
  t.end()
})
