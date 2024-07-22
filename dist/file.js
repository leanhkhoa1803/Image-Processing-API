"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const image_processing_1 = __importDefault(require("./image-processing"));
class File {
    static getImagePath(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.fileName) {
                return null;
            }
            const filePath = params.width && params.height
                ? path_1.default.resolve(File.imagesThumbPath, `${params.fileName}-${params.width}x${params.height}.jpg`)
                : path_1.default.resolve(File.imagesFullPath, `${params.fileName}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return filePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    static isImageAvailable() {
        return __awaiter(this, arguments, void 0, function* (filename = '') {
            if (!filename) {
                return false;
            }
            return (yield File.getAvailableImageNames()).includes(filename);
        });
    }
    static getAvailableImageNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.promises.readdir(File.imagesFullPath)).map((filename) => filename.split('.')[0]); // Cut extension
            }
            catch (_a) {
                return [];
            }
        });
    }
    static isThumbAvailable(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.fileName || !params.width || !params.height) {
                return false;
            }
            const filePath = path_1.default.resolve(File.imagesThumbPath, `${params.fileName}-${params.width}x${params.height}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static createThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(File.imagesThumbPath);
            }
            catch (_a) {
                fs_1.promises.mkdir(File.imagesThumbPath);
            }
        });
    }
    static createThumb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.fileName || !params.width || !params.height) {
                return null;
            }
            const filePathFull = path_1.default.resolve(File.imagesFullPath, `${params.fileName}.jpg`);
            const filePathThumb = path_1.default.resolve(File.imagesThumbPath, `${params.fileName}-${params.width}x${params.height}.jpg`);
            console.log(`Creating thumb ${filePathThumb}`);
            return yield (0, image_processing_1.default)({
                source: filePathFull,
                target: filePathThumb,
                width: parseInt(params.width),
                height: parseInt(params.height),
            });
        });
    }
}
File.imagesFullPath = path_1.default.resolve(__dirname, '../assets/images/full');
File.imagesThumbPath = path_1.default.resolve(__dirname, '../assets/images/thumb');
exports.default = File;
