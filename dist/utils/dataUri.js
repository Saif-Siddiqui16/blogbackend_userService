"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuffer = void 0;
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const getBuffer = (file) => {
    const parser = new parser_1.default();
    const ext = path_1.default.extname(file.oridinalname);
    const dataUri = parser.format(ext, file.buffer);
    return dataUri;
};
exports.getBuffer = getBuffer;
