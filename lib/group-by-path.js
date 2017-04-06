module.exports = function groupByPath(grouped, value) {
  const paths = value.split("/");
  let tmp = grouped;
  paths.forEach((path, i) => {
    if (i === paths.length - 1) {
      tmp.push(value);
    } else {
      let ttmp = tmp.find(f => Array.isArray(f) && f[0] === path);
      if (!ttmp) {
        ttmp = [path, []];
        tmp.push(ttmp);
      }
      tmp = ttmp[1];
    }
  });
  return grouped;
};
