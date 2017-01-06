module.exports = function renderNav (groupedFiles) {
  return `<ul>
${groupedFiles.map((f) => {
  if (Array.isArray(f)) {
    // HEADING WITH LINK
    const fIndex = f[1].find(e => e.text === 'index')
    if (fIndex) {
      const clazz = f.active ? 'active' : ''
      return `<li class="heading"><a class="${clazz}" href="${fIndex.href}">${f[0]}</a></li>\n${renderNav(f[1])}`
    } 
    // HEADING WITHOUT LINK
    return `<li class="heading">${f[0]}</li>\n${renderNav(f[1])}`
  } else {
    //  LEAF
    if (f.text && f.text.toLowerCase() === 'index') {
      return;
    }
    const clazz = f.active ? 'active' : ''
    return `<li><a class="${clazz}" href="${f.href}">${f.text}</a></li>`
  }
}).join('\n')}
</ul>`
}
