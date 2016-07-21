module.exports = function renderNav (groupedFiles) {
  return `<ul>
${groupedFiles.map((f) => {
  if (Array.isArray(f)) {
    // HEADING
    return `<li class="heading">${f[0]}</li>\n${renderNav(f[1])}`
  } else {
    //  LEAF
    const clazz = f.active ? 'active' : ''
    return `<li><a class="${clazz}" href="${f.href}">${f.text}</a></li>`
  }
}).join('\n')}
</ul>`
}

