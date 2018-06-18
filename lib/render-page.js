const contentS = "<!--CONTENT-->";
const navS = "<!--NAV-->";
const sitedataS = "<!--SITEDATA-->";

module.exports = function renderPage(template, navmenu, content, sitedata) {
  return template
    .split(navS)
    .join(navmenu)
    .split(contentS)
    .join(content)
    .split(sitedataS)
    .join(sitedata);
};
