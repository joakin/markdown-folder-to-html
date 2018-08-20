const contentS = "<!--CONTENT-->";
const navS = "<!--NAV-->";

export default function renderPage(
  template: string,
  navmenu: string,
  content: string
) {
  return template
    .split(navS)
    .join(navmenu)
    .split(contentS)
    .join(content);
}
