"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const sort_by_preferences_1 = __importDefault(require("../lib/sort-by-preferences"));
const sort = sort_by_preferences_1.default.bind(null, ["index.md", "README.md"]);
tape_1.default("sorts with normal string sort", t => {
    t.deepEqual(["a", "C", "A", "B", "~", "ab", "b"].sort(sort), [
        "A",
        "B",
        "C",
        "a",
        "ab",
        "b",
        "~"
    ]);
    t.end();
});
tape_1.default("sorts but puts first preferent strings", t => {
    t.deepEqual(["a", "C", "README.md", "A", "index.md", "B", "~", "ab", "b"].sort(sort), ["README.md", "index.md", "A", "B", "C", "a", "ab", "b", "~"]);
    t.end();
});
