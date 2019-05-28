"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_regex_1 = __importDefault(require("./markdown-regex"));
function pathToText(file, outputPath) {
    // Remove output folder if there is one
    return ((outputPath ? file.replace(outputPath + "/", "") : file)
        // Replace start of folder or file digits \d+ and dash out
        // 100-banana/10-apple/01-banana -> banana/apple/banana
        .replace(/(^|\/)(\d+-)/g, "$1")
        // Remove extension
        .replace(markdown_regex_1.default, "")
        // Replace _ and - with spaces
        .replace(/_|-/g, " "));
}
exports.default = pathToText;
