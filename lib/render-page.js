const contentR = /<!--CONTENT-->/g;
const navR = /<!--NAV-->/g;

module.exports = function renderPage(template, navmenu, content) {
  return template.replace(navR, navmenu).replace(contentR, content);
};
