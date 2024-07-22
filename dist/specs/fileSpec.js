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
const file_1 = __importDefault(require("./../file"));
describe('Test image processing via sharp', () => {
    it('invalid width value', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            fileName: 'fjord',
            width: '-100',
            height: '100',
        });
        expect(error).not.toBeNull();
    }));
    it('filename does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            fileName: 'test',
            width: '100',
            height: '500',
        });
        expect(error).not.toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path_1.default.resolve(file_1.default.imagesThumbPath, 'fjord-99x99.jpg');
    try {
        yield fs_1.promises.access(resizedImagePath);
        fs_1.promises.unlink(resizedImagePath);
    }
    catch (_a) {
        //
    }
}));
