"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const path_to_text_1 = __importDefault(require("../lib/path-to-text"));
tape_1.default("gets rid of the markdown extension", t => {
    t.equal(path_to_text_1.default("banana.md"), "banana");
    t.end();
});
tape_1.default("gets rid of the output dir", t => {
    t.equal(path_to_text_1.default("_output/banana", "_output"), "banana");
    t.end();
});
tape_1.default("gets rid of numbers at the front of the name on each sub level", t => {
    t.equal(path_to_text_1.default("1-banana/20-apple/005-tomato/banana"), "banana/apple/tomato/banana");
    t.end();
});
tape_1.default("swaps - and _ for spaces", t => {
    t.equal(path_to_text_1.default("banana-split/pina_colada"), "banana split/pina colada");
    t.end();
});
