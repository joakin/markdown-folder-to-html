"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPreferent = (x, preferences) => preferences.indexOf(x) > -1;
const strSort = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
function sortByPrecedence(preferences, a, b) {
    const aPref = isPreferent(a, preferences);
    const bPref = isPreferent(b, preferences);
    return aPref && bPref
        ? strSort(a, b)
        : aPref
            ? -1
            : bPref
                ? 1
                : strSort(a, b);
}
exports.default = sortByPrecedence;
