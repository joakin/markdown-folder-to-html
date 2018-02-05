const contentR = /<!--CONTENT-->/g;
const navR = /<!--NAV-->/g;
const sitedataR = /<!--SITEDATA-->/g;

module.exports = function renderPage(template, navmenu, content, sitedata) {
  return template.replace(navR, navmenu).replace(contentR, content).replace(sitedataR, sitedata);
};
