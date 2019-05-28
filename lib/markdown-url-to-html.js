"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_regex_1 = __importDefault(require("./markdown-regex"));
function mdUrl(file) {
    return file.replace(markdown_regex_1.default, ".html");
}
exports.default = mdUrl;
