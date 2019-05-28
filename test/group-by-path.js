"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const group_by_path_1 = __importDefault(require("../lib/group-by-path"));
tape_1.default("given a group of paths, it groups them in arrays when reducing over them", t => {
    const paths = [
        "index",
        "banana",
        "nested/banana",
        "nested/apple",
        "nested/super nested/thing"
    ];
    const groupedPaths = [
        { type: "file", value: "index" },
        { type: "file", value: "banana" },
        {
            type: "dir",
            name: "nested",
            children: [
                { type: "file", value: "nested/banana" },
                { type: "file", value: "nested/apple" },
                {
                    type: "dir",
                    name: "super nested",
                    children: [
                        {
                            type: "file",
                            value: "nested/super nested/thing"
                        }
                    ]
                }
            ]
        }
    ];
    t.deepEqual(paths.reduce(group_by_path_1.default, []), groupedPaths);
    t.end();
});
