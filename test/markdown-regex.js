"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const markdown_regex_1 = __importDefault(require("../lib/markdown-regex"));
tape_1.default("matches files with md extension", t => {
    t.ok(markdown_regex_1.default.test("banana.md"));
    t.notOk(markdown_regex_1.default.test("banana.md.other"));
    t.notOk(markdown_regex_1.default.test("bananamd"));
    t.end();
});
