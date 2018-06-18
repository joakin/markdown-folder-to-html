const contentS = "<!--CONTENT-->";
const navS = "<!--NAV-->";

module.exports = function renderPage(template, navmenu, content) {
  return template
    .split(navS)
    .join(navmenu)
    .split(contentS)
    .join(content);
};
