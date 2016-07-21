const test = require('tape')

const nav = require('../lib/render-nav')

test('renders a ul with plain index item as a li', (t) => {
  t.equal(
    nav([{text: 'banana', active: false, href: 'bananalink'}]),
    '<ul>\n<li><a class="" href="bananalink">banana</a></li>\n</ul>'
  )
  t.end()
})

test('renders a active class when index item is active', (t) => {
  t.equal(
    nav([{text: 'banana', active: true, href: 'bananalink'}]),
    '<ul>\n<li><a class="active" href="bananalink">banana</a></li>\n</ul>'
  )
  t.end()
})

test('renders a heading and nested items when index item is array', (t) => {
  t.equal(
    nav([
      {text: 'banana', active: true, href: 'bananalink'},
      [
        'headingtext',
        [{text: 'apple', active: false, href: 'applelink'}]
      ]
    ]),
`<ul>
<li><a class="active" href="bananalink">banana</a></li>
<li class="heading">headingtext</li>
<ul>
<li><a class="" href="applelink">apple</a></li>
</ul>
</ul>`
  )
  t.end()
})
