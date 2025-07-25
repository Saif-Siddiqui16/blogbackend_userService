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
exports.updateProfilePic = exports.updateUser = exports.getUserProfile = exports.myProfile = exports.loginUser = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TryCatch_js_1 = __importDefault(require("../utils/TryCatch.js"));
const cloudinary_1 = require("cloudinary");
const googleConfig_js_1 = require("../utils/googleConfig.js");
const axios_1 = __importDefault(require("axios"));
const dataUri_js_1 = require("../utils/dataUri.js");
exports.loginUser = (0, TryCatch_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    if (!code) {
        res.status(400).json({
            message: "Authorization code is required",
        });
        return;
    }
    const googleRes = yield googleConfig_js_1.oauth2client.getToken(code);
    googleConfig_js_1.oauth2client.setCredentials(googleRes.tokens);
    const userRes = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
    const { email, name, picture } = userRes.data;
    let user = yield user_model_js_1.default.findOne({ email });
    if (!user) {
        user = yield user_model_js_1.default.create({
            name,
            email,
            image: picture,
        });
    }
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "5d",
    });
    res.status(200).json({
        message: "Login success",
        token,
        user,
    });
}));
exports.myProfile = (0, TryCatch_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    return res.status(200).json(user);
}));
exports.getUserProfile = (0, TryCatch_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_js_1.default.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            message: "No user with this id",
        });
        return;
    }
    res.json(user);
}));
exports.updateUser = (0, TryCatch_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, instagram, facebook, linkedin, bio } = req.body;
    const user = yield user_model_js_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, {
        name,
        instagram,
        facebook,
        linkedin,
        bio,
    }, { new: true });
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "5d",
    });
    res.json({
        message: "User Updated",
        token,
        user,
    });
}));
exports.updateProfilePic = (0, TryCatch_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "No file to upload",
        });
        return;
    }
    const fileBuffer = (0, dataUri_js_1.getBuffer)(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({
            message: "Failed to generate buffer",
        });
        return;
    }
    const cloud = yield cloudinary_1.v2.uploader.upload(fileBuffer.content, {
        folder: "blogs",
    });
    const user = yield user_model_js_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, {
        image: cloud.secure_url,
    }, { new: true });
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "5d",
    });
    res.json({
        message: "User Profile pic updated",
        token,
        user,
    });
}));
