"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const path_to_text_1 = __importDefault(require("./path-to-text"));
const markdown_url_to_html_1 = __importDefault(require("./markdown-url-to-html"));
const assert_never_1 = __importDefault(require("./assert-never"));
function generateIndexInfo(currentFile, groupedFiles) {
    const currentDir = path_1.default.dirname(currentFile);
    return groupedFiles.map((f) => {
        if (f.type === "dir") {
            return {
                type: "dir",
                name: path_to_text_1.default(f.name),
                children: generateIndexInfo(currentFile, f.children)
            };
        }
        else if (f.type === "file") {
            const active = f.value === currentFile;
            const href = markdown_url_to_html_1.default(path_1.default.relative(currentDir, f.value));
            const parts = f.value.split("/");
            const text = path_to_text_1.default(parts[parts.length - 1]);
            return { type: "file", value: { active, href, text } };
        }
        return assert_never_1.default(f); // Error out if we're not handling all FileNode cases
    });
}
exports.default = generateIndexInfo;
