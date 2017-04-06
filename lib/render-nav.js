module.exports = function renderNav(groupedFiles, level = 0) {
  return `<ul>
${groupedFiles
    .map(f => {
      if (Array.isArray(f)) {
        // HEADING WITH LINK
        const indexFile = getIndexFile(f[1]);
        if (indexFile) {
          return `<li class="heading">${renderActive(f[0], indexFile.href, indexFile.active)}</li>\n${renderNav(f[1], level + 1)}`;
        }
        // HEADING WITHOUT LINK
        return `<li class="heading">${f[0]}</li>\n${renderNav(f[1], level + 1)}`;
      } else {
        //  LEAF

        // Skip index files on nested levels since the Heading links to them.
        if (level > 0 && f.text && f.text.toLowerCase() === 'index') return;

        return `<li>${renderActive(f.text, f.href, f.active)}</li>`;
      }
    })
    .join('\n')}
</ul>`;
};

function renderActive(text, href, active) {
  return `<a class="${active ? 'active' : ''}" href="${href}">${text}</a>`;
}

function getIndexFile(files) {
  return files.find(e => !Array.isArray(e) && e.text === 'index');
}
